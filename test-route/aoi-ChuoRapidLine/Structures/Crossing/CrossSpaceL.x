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
 20;
 -0.99735;-0.03854;0.00881;,
 -0.99735;-0.03854;5.00880;,
 -0.99735;-0.53364;5.00880;,
 -0.99735;-0.53364;0.00881;,
 -2.99735;-0.03854;5.00880;,
 -2.99735;-0.03854;0.00881;,
 -2.99735;-0.53364;0.00881;,
 -2.99735;-0.53364;5.00880;,
 -1.54167;-0.53364;0.00881;,
 -1.54167;-0.53364;5.00880;,
 -1.54167;-0.53364;0.00881;,
 -1.54167;-0.13403;0.00881;,
 -1.54167;-0.53364;5.00880;,
 -1.54167;-0.13403;5.00880;,
 -2.57237;-0.53364;0.00881;,
 -2.57237;-0.53364;5.00880;,
 -2.57237;-0.53364;0.00881;,
 -2.57237;-0.13403;0.00881;,
 -2.57237;-0.53364;5.00880;,
 -2.57237;-0.13403;5.00880;;
 
 14;
 4;0,1,2,3;,
 4;4,5,6,7;,
 4;8,3,2,9;,
 4;10,11,0,3;,
 4;12,2,1,13;,
 4;11,13,1,0;,
 4;14,8,9,15;,
 4;14,15,7,6;,
 4;16,6,5,17;,
 4;16,17,11,10;,
 4;18,12,13,19;,
 4;18,19,4,7;,
 4;17,5,4,19;,
 4;17,19,13,11;;
 
 MeshMaterialList {
  8;
  14;
  5,
  5,
  5,
  4,
  4,
  6,
  5,
  5,
  4,
  4,
  4,
  4,
  6,
  6;;
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "rail_top.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "rail_side.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "ballast_0.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "ballast.png";
   }
  }
  Material {
   0.194400;0.194400;0.194400;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "CrossRail.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "Space.png";
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
  20;
  0.001577;0.495597;,
  0.001577;-2.004402;,
  0.001577;-2.004402;,
  0.001577;0.495597;,
  -0.998426;-2.004402;,
  -0.998426;0.495597;,
  -0.998426;0.495597;,
  -0.998426;-2.004402;,
  -0.270583;0.495597;,
  -0.270583;-2.004402;,
  -0.270583;0.495597;,
  -0.270583;0.495597;,
  -0.270583;-2.004402;,
  -0.270583;-2.004402;,
  -0.785936;0.495597;,
  -0.785936;-2.004402;,
  -0.785936;0.495597;,
  -0.785936;0.495597;,
  -0.785936;-2.004402;,
  -0.785936;-2.004402;;
 }
}
