import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
 apiKey: '0588606d0a2f4355a73db0842e2d247f'
});

const particlesOptions = {
  particles: {
    number: {
      value:30,
      density: {
        enable:true,
        value_area:800
    }
  }
}
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box: '',
      route:'signin',
      isSignedIn:false
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route});
    if(route === 'signout'){
      this.setState({isSignedIn:false})
    } else if(route === 'home') {
      this.setState({isSignedIn:true})
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);
    return {
      leftCol:clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box})
  }
  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input:event.target.value})
  }
  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input})
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }
  render() {
    const {isSignedIn, box, imageUrl, route} = this.state;
    return (
      <div className="App">
      <Particles className='particles' 
        params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin' ?
            <Signin onRouteChange = {this.onRouteChange} /> 
            : <Register onRouteChange = {this.onRouteChange} />
            )
        
        }
      </div>
    );
  }
}

export default App;
