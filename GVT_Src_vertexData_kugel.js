var kugel = ( function() {

    function createVertexData(){

        var recDepth = document.getElementById('depthInput').value;
		var vector = function(x,y,z) {
			return {
				x: x,
				y: y,
				z: z,
				a: x,
				b: y,
				c: z
			}
		}

		var normalize = function(vec) {

			var length = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
			return vector(vec.x / length, vec.y / length, vec.z / length);
		}


        var points = [];
        var triangles = [];

        // create basic geometry
		points.push(normalize(vector( 0, -1,  0)));
		points.push(normalize(vector(-1,  0,  1)));
		points.push(normalize(vector( 1,  0,  1)));
		points.push(normalize(vector( 1,  0, -1)));
		points.push(normalize(vector(-1,  0, -1)));
		points.push(normalize(vector( 0,  1,  0)));

        triangles.push(vector(0, 2, 1));
        triangles.push(vector(0, 3, 2));
        triangles.push(vector(0, 4, 3));
        triangles.push(vector(0, 1, 4));
        triangles.push(vector(1, 2, 5));
        triangles.push(vector(2, 3, 5));
        triangles.push(vector(3, 4, 5));
        triangles.push(vector(4, 1, 5));

		// calc center between two points
		var calcCenter = function(p1,p2){

			var pk1 = points[p1];
			var pk2 = points[p2];

			var center = vector((pk1.x + pk2.x)/2, (pk1.y + pk2.y)/2, (pk1.z + pk2.z)/2);
			points.push(normalize(center));
			return points.length-1;
		};

		var calcNewTriangles = function(currTriangle, step){

			// condition stop
			if(step == 0){
				return currTriangle; 
			}	

			var newTriangle = [];
			for (var i = 0; i < currTriangle.length; i++){

				var three = currTriangle[i];
				var new1 = calcCenter(three.a, three.b);
				var new2 = calcCenter(three.b, three.c);
				var new3 = calcCenter(three.c, three.a);

				newTriangle.push(vector(three.a, new1, new3));
				newTriangle.push(vector(new1, three.b, new2));
				newTriangle.push(vector(new3, new2, three.c));
				newTriangle.push(vector(new1, new2, new3));
			}

			return calcNewTriangles(newTriangle, step-1); // rekursion
		}

		// calling recursion method 
		triangles = calcNewTriangles(triangles, recDepth);

		// Positions.
		this.vertices = new Float32Array(3 * points.length);
		var vertices = this.vertices;
		// Normals.
		this.normals = new Float32Array(3 * points.length);
		var normals = this.normals;
		// Index data.
		this.indicesLines = new Uint16Array(6 * triangles.length);
		var indicesLines = this.indicesLines;
		this.indicesTris = new Uint16Array(3 * triangles.length);
		var indicesTris = this.indicesTris;

		for (var i = 0; i < points.length; i++){
            // verts
			vertices[i * 3]     = points[i].x;
			vertices[i * 3 + 1] = points[i].y;
			vertices[i * 3 + 2] = points[i].z;

            // normals
			normals[i * 3]     = points[i].x;
			normals[i * 3 + 1] = points[i].y;
			normals[i * 3 + 2] = points[i].z;
		}

		for (var i = 0; i < triangles.length; i++){
            // gitter
			indicesLines[i * 6]     = triangles[i].a;
			indicesLines[i * 6 + 1] = triangles[i].b;
			indicesLines[i * 6 + 2] = triangles[i].b;
			indicesLines[i * 6 + 3] = triangles[i].c;
			indicesLines[i * 6 + 4] = triangles[i].c;
			indicesLines[i * 6 + 5] = triangles[i].a;
            
            // triangles
			indicesTris[i * 3]     = triangles[i].a;
			indicesTris[i * 3 + 1] = triangles[i].b;
			indicesTris[i * 3 + 2] = triangles[i].c;
		}
    }   

	return {
		createVertexData : createVertexData
	}

}());
