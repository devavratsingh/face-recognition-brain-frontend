import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({imageUrl, box}) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img 
				src={imageUrl}
				alt='FaceRecognition' 
				width='500px'
				height='auto'
				id='inputImage'
				/>
				<div style={{top:box.topRow, left:box.leftCol, right:box.rightCol, bottom:box.bottomRow}}className='bounding-box'></div>
			</div>
		</div>
		)
}
export default FaceRecognition;