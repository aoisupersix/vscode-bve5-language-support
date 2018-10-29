xof 0302txt 0064
template Header {
 <3D82AB43-62DA-11cf-AB39-0020AF71E433>
 WORD major;
 WORD minor;
 DWORD flags;
}

template Vector {
 <3D82AB5E-62DA-11cf-AB39-0020AF71E433>
 FLOAT x;
 FLOAT y;
 FLOAT z;
}

template Coords2d {
 <F6F23F44-7686-11cf-8F52-0040333594A3>
 FLOAT u;
 FLOAT v;
}

template Matrix4x4 {
 <F6F23F45-7686-11cf-8F52-0040333594A3>
 array FLOAT matrix[16];
}

template ColorRGBA {
 <35FF44E0-6C7C-11cf-8F52-0040333594A3>
 FLOAT red;
 FLOAT green;
 FLOAT blue;
 FLOAT alpha;
}

template ColorRGB {
 <D3E16E81-7835-11cf-8F52-0040333594A3>
 FLOAT red;
 FLOAT green;
 FLOAT blue;
}

template IndexedColor {
 <1630B820-7842-11cf-8F52-0040333594A3>
 DWORD index;
 ColorRGBA indexColor;
}

template Boolean {
 <4885AE61-78E8-11cf-8F52-0040333594A3>
 WORD truefalse;
}

template Boolean2d {
 <4885AE63-78E8-11cf-8F52-0040333594A3>
 Boolean u;
 Boolean v;
}

template MaterialWrap {
 <4885AE60-78E8-11cf-8F52-0040333594A3>
 Boolean u;
 Boolean v;
}

template TextureFilename {
 <A42790E1-7810-11cf-8F52-0040333594A3>
 STRING filename;
}

template Material {
 <3D82AB4D-62DA-11cf-AB39-0020AF71E433>
 ColorRGBA faceColor;
 FLOAT power;
 ColorRGB specularColor;
 ColorRGB emissiveColor;
 [...]
}

template MeshFace {
 <3D82AB5F-62DA-11cf-AB39-0020AF71E433>
 DWORD nFaceVertexIndices;
 array DWORD faceVertexIndices[nFaceVertexIndices];
}

template MeshFaceWraps {
 <4885AE62-78E8-11cf-8F52-0040333594A3>
 DWORD nFaceWrapValues;
 Boolean2d faceWrapValues;
}

template MeshTextureCoords {
 <F6F23F40-7686-11cf-8F52-0040333594A3>
 DWORD nTextureCoords;
 array Coords2d textureCoords[nTextureCoords];
}

template MeshMaterialList {
 <F6F23F42-7686-11cf-8F52-0040333594A3>
 DWORD nMaterials;
 DWORD nFaceIndexes;
 array DWORD faceIndexes[nFaceIndexes];
 [Material]
}

template MeshNormals {
 <F6F23F43-7686-11cf-8F52-0040333594A3>
 DWORD nNormals;
 array Vector normals[nNormals];
 DWORD nFaceNormals;
 array MeshFace faceNormals[nFaceNormals];
}

template MeshVertexColors {
 <1630B821-7842-11cf-8F52-0040333594A3>
 DWORD nVertexColors;
 array IndexedColor vertexColors[nVertexColors];
}

template Mesh {
 <3D82AB44-62DA-11cf-AB39-0020AF71E433>
 DWORD nVertices;
 array Vector vertices[nVertices];
 DWORD nFaces;
 array MeshFace faces[nFaces];
 [...]
}

Header{
1;
0;
1;
}

Mesh {
 34;
 1.49037;1.10000;20.29847;,
 2.38720;1.10420;20.30000;,
 2.38718;1.10422;0.00000;,
 1.49037;1.10000;0.00000;,
 2.22624;-0.67307;-0.00000;,
 2.38827;-0.67307;-0.00000;,
 2.38827;-0.67307;20.29847;,
 2.22624;-0.67307;20.29847;,
 1.49037;0.85407;20.29847;,
 1.49037;1.10000;20.29847;,
 1.49037;1.10000;0.00000;,
 1.49037;0.85407;0.00000;,
 1.49037;0.85407;20.29847;,
 2.38827;0.85407;20.29847;,
 2.38720;1.10420;20.30000;,
 1.49037;1.10000;20.29847;,
 1.49037;0.85407;0.00000;,
 1.49037;1.10000;0.00000;,
 2.38718;1.10422;0.00000;,
 2.38827;0.85407;0.00000;,
 2.22624;0.85186;20.29847;,
 2.22624;0.85186;0.00000;,
 2.22624;-0.67307;-0.00000;,
 2.22624;-0.67307;20.29847;,
 2.22624;0.85186;20.29847;,
 2.22624;-0.67307;20.29847;,
 2.38827;-0.67307;20.29847;,
 2.38827;0.84798;20.29847;,
 2.22624;0.85186;0.00000;,
 1.49037;0.85407;0.00000;,
 2.38827;0.85407;0.00000;,
 2.38827;0.84798;0.00000;,
 2.38827;-0.67307;-0.00000;,
 2.22624;-0.67307;-0.00000;;
 
 10;
 4;0,1,2,3;,
 4;4,5,6,7;,
 4;8,9,10,11;,
 4;12,13,14,15;,
 4;16,17,18,19;,
 4;20,21,22,23;,
 4;24,25,26,27;,
 4;24,27,13,12;,
 4;28,29,30,31;,
 4;28,31,32,33;;
 
 MeshMaterialList {
  5;
  10;
  0,
  4,
  2,
  1,
  3,
  1,
  1,
  1,
  1,
  1;;
  Material {
   0.483137;0.483137;0.483137;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "ToyodaC.png";
   }
  }
  Material {
   0.480000;0.480000;0.480000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "sta_under.png";
   }
  }
  Material {
   0.480000;0.480000;0.480000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "sta_side.png";
   }
  }
  Material {
   0.480000;0.480000;0.480000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "sta_side.png";
   }
  }
  Material {
   1.000000;1.000000;1.000000;1.000000;;
   0.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
  }
 }
 MeshTextureCoords {
  34;
  4.248030;45.429989;,
  5.270650;45.433380;,
  5.270620;0.500000;,
  4.248030;0.500000;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  39.841949;-2.986390;,
  39.841949;-3.990290;,
  0.037210;-3.990290;,
  0.037210;-2.986390;,
  1.245180;0.072960;,
  1.694130;0.072960;,
  1.693600;-0.052100;,
  1.245180;-0.050000;,
  -2.422523;-2.986289;,
  -2.422523;-3.990162;,
  -4.181114;-4.007389;,
  -4.183246;-2.986289;,
  2.506610;0.074070;,
  0.500000;0.074070;,
  0.500000;0.836540;,
  2.506610;0.836540;,
  1.613120;0.074070;,
  1.613120;0.836540;,
  1.694130;0.836540;,
  1.694130;0.076010;,
  1.613120;0.074070;,
  1.245190;0.072960;,
  1.694130;0.072960;,
  1.694130;0.076010;,
  1.694130;0.836540;,
  1.613120;0.836540;;
 }
}
