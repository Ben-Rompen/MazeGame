/* matrix3d.js
	by Ben Rompen
	
	Javascript class for 4x4 2D matrices suitable for operations in 3D image generation.
*/

function Matrix3D(){
	this.value = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
}

Matrix3D.prototype.makeScale = function(sx, sy, sz){
	this.value = [
		sx, 0, 0, 0,
		0, sy, 0, 0,
		0, 0, sz, 0,
		0, 0, 0, 1
	];
}

Matrix3D.prototype.makeTranslation = function(tx, ty, tz){
	this.value = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		tx, ty, tz, 1
	];
}

Matrix3D.prototype.makeXRotation = function(angleInDegrees)
{
	var angleInRadians = angleInDegrees * Math.PI / 180;
	var s = Math.sin(angleInRadians);
	var c = Math.cos(angleInRadians);
	
	this.value = [
		1, 0, 0, 0,
		0, c, s, 0,
		0, -s, c, 0,
		0, 0, 0, 1
	];
}

Matrix3D.prototype.makeYRotation = function(angleInDegrees)
{
	var angleInRadians = angleInDegrees * Math.PI / 180;
	var s = Math.sin(angleInRadians);
	var c = Math.cos(angleInRadians);
	
	this.value = [
		c, 0, -s, 0,
		0, 1, 0, 0,
		s, 0, c, 0,
		0, 0, 0, 1
	];
}

Matrix3D.prototype.makeZRotation = function(angleInDegrees)
{
	var angleInRadians = angleInDegrees * Math.PI / 180;
	var s = Math.sin(angleInRadians);
	var c = Math.cos(angleInRadians);
	
	this.value = [
		c, -s, 0, 0,
		s, c, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	];
}

Matrix3D.prototype.makePerspective = function(fieldOfView, aspect, near, far)
{
	var fieldOfViewInRadians = fieldOfView * Math.PI / 180;
	var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
	var rangeInv = 1.0 / (near - far);
	
	this.value = [
		f / aspect, 0, 0, 0,
		0, f, 0, 0, 
		0, 0, (near + far) * rangeInv, -1,
		0, 0, near * far * rangeInv *2, 0
	];
}

Matrix3D.prototype.make2DProjection = function(width, height, depth)
{
	this.value = [
		2 / width, 0, 0, 0,
		0, -2 / height, 0, 0,
		0, 0, 2 / depth, 0,
		-1, 1, 0, 1
	]
}

Matrix3D.prototype.matrixMultiply = function(mata, matb)
{
	var output = [];
	for(i = 0; i < 4; i++)
	{
		for(j = 0; j < 4; j++)
		{
			output[i*4+j] = mata.value[i*4+0]*matb.value[0+j] + mata.value[i*4+1]*matb.value[4+j] + mata.value[i*4+2]*matb.value[8+j] + mata.value[i*4+3]*matb.value[12+j];
		}
	}
	return output;
}