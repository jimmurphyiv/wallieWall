import React, { Component } from 'react';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import axios from 'axios';

class Dropzone extends Component {
    constructor() {
        super();
        this.state = {
          isUploading: false,
          url: 'http://via.placeholder.com/450x450'
        };
    }

    getSignedRequest = ([file]) => {
        this.setState({ isUploading: true });
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

        axios.get('/api/signs3', {
          params: {
            'file-name': fileName,
            'file-type': file.type,
          },
        })
        .then(res => {
          const {signedRequest, url} = res.data;
          this.uploadFile(file, signedRequest, url);
        })
        .catch(err => {console.log(err);
        });
    };

    uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
            'Content-Type': file.type,
            },
        };
        axios.put(signedRequest, file, options)
      .then(res => {
        this.setState({ isUploading: false, url });
    })
    .catch(err => {
        this.setState({
          isUploading: false,
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
              err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  render() {
    const { url, isUploading } = this.state;
    return (
      <div className="dropzone">
           <h1>Upload</h1>
           <h1>{url}</h1>
        <img src={url} alt="" width="450px" />
            <Dropzone
            onDropAccepted={this.getSignedRequest}
            style={{
                position: 'relative',
                width: 200,
                height: 200,
                borderWidth: 7,
                marginTop: 100,
                borderColor: 'rgb(102, 102, 102)',
                borderStyle: 'dashed',
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 28,
            }}
                accept="image/*"
                multiple={false}>
                {isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>}
            </Dropzone>
        </div>
        );
    }
}

export default Dropzone;