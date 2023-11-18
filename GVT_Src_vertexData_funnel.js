var funnel = ( function() {

	function createVertexData() {
		var n = 15;
		var m = 22;

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

		minu = 0.1;
		maxu = 2;

		minv = 0;
		maxv = 2*Math.PI;
		
		var du = (maxu+minu)/n;
		var dv = (minv-maxv)/m;

		// Counter for entries in index array.
		var iLines = 0;
		var iTris = 0;

		for (var i = 0, u = minu; i <= n; i++, u += du) {

			for (var j = 0, v = minv; j <= m; j++, v += dv) {

				var iVertex = i * (m + 1) + j;
				
				var x = 1.5 * u * Math.cos(v);
				var z = u * Math.sin(v);
				var y = 2 * Math.log(u) + 1;

				// Set vertex positions
				vertices[iVertex * 3] = x*0.4+1.5;
				vertices[iVertex * 3 + 1] = y*0.4+0.3;
				vertices[iVertex * 3 + 2] = z*0.4;
				
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
