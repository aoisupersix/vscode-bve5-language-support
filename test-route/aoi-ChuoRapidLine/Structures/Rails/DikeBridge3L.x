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
 33;
 -2.42747;0.73270;10.20000;,
 -2.33250;0.73270;10.20000;,
 -2.33254;0.73270;-0.02573;,
 -2.42750;0.73270;-0.02573;,
 -2.33254;-0.30243;-0.02569;,
 -2.33254;0.73270;-0.02573;,
 -2.33250;0.73270;10.20000;,
 -2.33250;-0.30243;10.19997;,
 -2.33254;-0.30243;-0.02569;,
 -2.42750;-0.30243;-0.02569;,
 -2.42750;0.73270;-0.02573;,
 -2.33254;0.73270;-0.02573;,
 -2.42750;-0.30243;-0.02569;,
 -2.42747;-0.30243;10.19997;,
 -2.42747;0.73270;10.20000;,
 -2.42750;0.73270;-0.02573;,
 -0.96369;-0.30243;-0.02569;,
 -2.33254;-0.30243;-0.02569;,
 -2.33250;-0.30243;10.19997;,
 -0.96365;-0.30243;10.19997;,
 -0.96369;-0.30243;-0.02569;,
 -0.96365;-0.30243;10.19997;,
 -0.96365;-0.52993;10.20000;,
 -0.96369;-0.52993;-0.02569;,
 -0.96369;-0.30243;-0.02569;,
 -0.96369;-0.52993;-0.02569;,
 -2.42750;-0.52993;-0.02569;,
 -2.42750;-0.30243;-0.02569;,
 -2.42750;-0.30243;-0.02569;,
 -2.42750;-0.52993;-0.02569;,
 -2.42747;-0.52993;10.20000;,
 -2.42747;-0.30243;10.19997;,
 -2.42750;-0.30243;-0.02569;;
 
 9;
 4;0,1,2,3;,
 4;4,5,6,7;,
 4;8,9,10,11;,
 4;12,13,14,15;,
 4;16,17,18,19;,
 4;20,21,22,23;,
 4;24,25,26,27;,
 4;28,29,30,31;,
 3;32,8,24;;
 
 MeshMaterialList {
  2;
  9;
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0;;
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "wallSide.png";
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
  33;
  2.999472;-25.057087;,
  2.999472;-24.091404;,
  0.495927;-24.091404;,
  0.495927;-25.057087;,
  0.000000;0.834430;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;0.834430;,
  0.962857;0.834430;,
  1.000000;0.807466;,
  1.000000;0.000000;,
  0.962857;0.000000;,
  0.000000;0.807466;,
  1.000000;0.807466;,
  1.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;0.962856;,
  1.000000;0.962856;,
  1.000000;0.000000;,
  0.000000;0.814184;,
  1.000000;0.814184;,
  1.000000;0.991231;,
  0.000000;0.991231;,
  0.000000;0.814184;,
  0.000000;0.991231;,
  1.000000;1.000000;,
  1.000000;0.838842;,
  0.000000;0.838842;,
  0.000000;1.000000;,
  1.000000;1.000000;,
  1.000000;0.838842;,
  1.000000;0.823154;;
 }
}
