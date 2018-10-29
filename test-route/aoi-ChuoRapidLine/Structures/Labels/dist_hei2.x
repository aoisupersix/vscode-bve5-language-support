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
 28;
 -0.06013;0.39190;0.10000;,
 0.06013;0.39190;0.10000;,
 0.06013;0.20999;-0.10000;,
 -0.06013;0.20999;-0.10000;,
 -0.06013;0.02780;-0.10000;,
 -0.06013;-0.10000;-0.10000;,
 -0.06013;-0.10000;0.10000;,
 -0.06013;0.02662;0.10000;,
 -0.06013;0.39190;0.10000;,
 -0.06013;0.20999;-0.10000;,
 -0.06013;0.02780;-0.10000;,
 -0.06013;0.20999;-0.10000;,
 0.06013;0.20999;-0.10000;,
 0.06013;0.02780;-0.10000;,
 0.06013;-0.10000;-0.10000;,
 -0.06013;-0.10000;-0.10000;,
 -0.06013;0.02662;0.10000;,
 -0.06013;-0.10000;0.10000;,
 0.06013;-0.10000;0.10000;,
 0.06013;0.02662;0.10000;,
 0.06013;0.39190;0.10000;,
 -0.06013;0.39190;0.10000;,
 0.06013;0.02780;-0.10000;,
 0.06013;0.20999;-0.10000;,
 0.06013;0.39190;0.10000;,
 0.06013;0.02662;0.10000;,
 0.06013;-0.10000;0.10000;,
 0.06013;-0.10000;-0.10000;;
 
 9;
 4;0,1,2,3;,
 4;4,5,6,7;,
 4;4,7,8,9;,
 4;10,11,12,13;,
 4;10,13,14,15;,
 4;16,17,18,19;,
 4;16,19,20,21;,
 4;22,23,24,25;,
 4;22,25,26,27;;
 
 MeshMaterialList {
  3;
  9;
  2,
  1,
  0,
  0,
  1,
  1,
  0,
  0,
  1;;
  Material {
   0.696800;0.696800;0.696800;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
  }
  Material {
   0.220000;0.153600;0.166400;1.000000;;
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
    "Dist_Hei2.png";
   }
  }
 }
 MeshTextureCoords {
  28;
  0.146566;-1.084610;,
  0.853016;-1.084701;,
  0.853221;0.111545;,
  0.146771;0.111637;,
  1.000000;0.587730;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  0.000000;0.587730;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  0.000000;0.587730;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;0.587730;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  1.000000;0.587730;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  0.000000;0.587730;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  0.000000;0.587730;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;0.587730;,
  1.000000;1.000000;,
  0.000000;1.000000;;
 }
}
