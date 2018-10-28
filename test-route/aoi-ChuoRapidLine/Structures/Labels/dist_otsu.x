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
 29;
 0.00090;0.70079;0.00069;,
 -0.05246;0.47313;-0.05117;,
 -0.05246;0.47313;0.05117;,
 0.05246;0.47313;0.05117;,
 0.05246;0.47313;-0.05117;,
 0.05246;0.47313;-0.05117;,
 -0.05246;0.47313;-0.05117;,
 -0.05246;0.47313;0.05117;,
 0.05246;0.47313;0.05117;,
 -0.05246;0.05770;0.05117;,
 -0.05246;-0.07841;0.05117;,
 0.05246;-0.07841;0.05117;,
 0.05246;0.05770;0.05117;,
 -0.05246;0.05770;0.05117;,
 -0.05246;0.05770;-0.05117;,
 -0.05246;-0.07841;-0.05117;,
 -0.05246;-0.07841;0.05117;,
 0.05246;0.05770;0.05117;,
 0.05246;-0.07841;0.05117;,
 0.05246;-0.07841;-0.05117;,
 0.05246;0.05770;-0.05117;,
 -0.05246;0.05770;-0.05117;,
 -0.05246;0.47313;-0.05117;,
 0.05246;0.47313;-0.05117;,
 0.05246;0.05770;-0.05117;,
 -0.05246;0.05770;-0.05117;,
 0.05246;0.05770;-0.05117;,
 0.05246;-0.07841;-0.05117;,
 -0.05246;-0.07841;-0.05117;;
 
 12;
 3;0,1,2;,
 3;0,3,4;,
 3;0,5,6;,
 3;0,7,8;,
 4;9,10,11,12;,
 4;9,12,8,7;,
 4;13,2,1,14;,
 4;13,14,15,16;,
 4;17,18,19,20;,
 4;17,20,4,3;,
 4;21,22,23,24;,
 4;25,26,27,28;;
 
 MeshMaterialList {
  3;
  12;
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  0,
  1,
  2,
  0;;
  Material {
   0.185098;0.185098;0.185098;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
  }
  Material {
   0.696471;0.696471;0.696471;1.000000;;
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
    "Dist_Otsu.png";
   }
  }
 }
 MeshTextureCoords {
  29;
  0.500000;0.000000;,
  1.000000;0.100183;,
  0.000000;0.100183;,
  1.000000;0.100183;,
  0.000000;0.100183;,
  1.000000;0.100183;,
  0.000000;0.100183;,
  1.000000;0.100183;,
  0.000000;0.100183;,
  1.000000;0.777947;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  0.000000;0.777947;,
  0.000000;0.777947;,
  1.000000;0.777947;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  1.000000;0.777947;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  0.000000;0.777947;,
  0.026693;0.003363;,
  0.026693;-1.011189;,
  0.973307;-1.011189;,
  0.973307;0.003363;,
  0.000000;0.777947;,
  1.000000;0.777947;,
  1.000000;1.000000;,
  0.000000;1.000000;;
 }
}
