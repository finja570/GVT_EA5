var fish = ( function() {

	function createVertexData() {

		var n = 20;
		var m = 25;
		// Positions.
		this.vertices = new Float32Array(3 * (n + 1) * (m + 1));
		var vertices = this.vertices;
		// Normals.
		this.normals = new Float32Array(3 * (n + 1) * (m + 1));
		var normals = this.normals;
		// Index data.
		this.indicesLines = new Uint16Array(2 * 2 * n * m);
		var indicesLines = this.indicesLines;
		this.indicesTris = new Uint16Array(3 * 2 * n * m);
		var indicesTris = this.indicesTris;

		minu = 0.0;
		maxu = Math.PI;

		minv = 0.0;
		maxv = 2*Math.PI;
		
		var du = (maxu+minu)/n;
		var dv = (minv-maxv)/m;

		// Counter for entries in index array.
		var iLines = 0;
		var iTris = 0;

		for (var i = 0, u = minu; i <= n; i++, u += du) {

			for (var j = 0, v = minv; j <= m; j++, v += dv) {
				
				var iVertex = i * (m + 1) + j;	

				var x = 3*Math.cos(u);
				var z = 3*(Math.sin(u) - Math.sin(2* u))* Math.sin(v)/4;
				var y = 3*(Math.cos(u) - Math.cos(2* u)) * Math.cos(v)/4;

				// Set vertex positions
				vertices[iVertex * 3] = x*0.3-2.0;
				vertices[iVertex * 3 + 1] = y*0.3;
				vertices[iVertex * 3 + 2] = z*0.3;

				// Calc and set normals.
				var nx = Math.cos(u) * Math.cos(v);
				var ny = Math.cos(u) * Math.sin(v);
				var nz = Math.sin(u);
				normals[iVertex * 3] = nx;
				normals[iVertex * 3 + 1] = ny;
				normals[iVertex * 3 + 2] = nz;

				// Set index
				if (j > 0 && i > 0) {
					indicesLines[iLines++] = iVertex - 1;
					indicesLines[iLines++] = iVertex;
				}

				if (j > 0 && i > 0) {
					indicesLines[iLines++] = iVertex - (m + 1);
					indicesLines[iLines++] = iVertex;
				}

				// Set index.
				// Two Triangles.
				if(j>0 && i>0){
					indicesTris[iTris++] = iVertex;
					indicesTris[iTris++] = iVertex - 1;
					indicesTris[iTris++] = iVertex - (m+1);
					//							
					indicesTris[iTris++] = iVertex - 1;
					indicesTris[iTris++] = iVertex - (m+1) - 1;							
					indicesTris[iTris++] = iVertex - (m+1);							
				}
			}
		}
	}

	return {
		createVertexData : createVertexData
	}

}());
