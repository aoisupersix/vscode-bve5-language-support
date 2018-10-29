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
 5.81598;8.52160;-12.44248;,
 5.81598;8.52160;12.44244;,
 5.81598;-0.01834;13.04733;,
 5.81598;-0.01834;-13.04737;,
 5.44444;9.03016;12.44244;,
 5.44444;9.03016;-12.44248;,
 5.81598;-0.01834;13.04733;,
 5.81598;8.52160;12.44244;,
 5.44444;8.64016;13.04733;,
 5.44444;8.64016;-13.04737;,
 5.81598;8.52160;-12.44248;,
 5.81598;-0.01834;-13.04737;,
 5.44444;9.03016;-12.44248;,
 5.44444;9.03016;12.44244;,
 -5.81590;8.52160;12.44244;,
 -5.81590;8.52160;-12.44248;,
 -5.81590;-0.01834;-13.04737;,
 -5.81590;-0.01834;13.04733;,
 -5.44827;9.04178;-12.44248;,
 -5.44827;9.04178;12.44244;,
 -5.81590;-0.01834;-13.04737;,
 -5.81590;8.52160;-12.44248;,
 -5.44827;8.65178;-13.04737;,
 -5.44827;8.65178;13.04733;,
 -5.81590;8.52160;12.44244;,
 -5.81590;-0.01834;13.04733;,
 -5.44827;9.04178;12.44244;,
 -5.44827;9.04178;-12.44248;,
 -0.30237;10.86389;-13.04737;,
 -0.30237;10.86389;13.04733;,
 -0.30237;10.86389;-13.04737;,
 -0.30237;10.86389;13.04733;,
 -0.30237;-0.01834;-13.04737;,
 -0.30237;-0.01834;13.04733;;
 
 22;
 4;0,1,2,3;,
 4;4,1,0,5;,
 3;6,7,8;,
 3;9,10,11;,
 3;9,12,10;,
 3;13,8,7;,
 4;14,15,16,17;,
 4;18,15,14,19;,
 3;20,21,22;,
 3;23,24,25;,
 3;23,26,24;,
 3;27,22,21;,
 4;28,18,19,29;,
 3;22,27,30;,
 3;31,26,23;,
 4;28,29,4,5;,
 3;8,13,31;,
 3;30,12,9;,
 4;30,9,11,32;,
 4;30,32,20,22;,
 4;31,23,25,33;,
 4;31,33,6,8;;
 
 MeshMaterialList {
  3;
  22;
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  1,
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
    "soko1.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "soko1-2.png";
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
  0.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;0.000000;,
  1.000000;1.000000;,
  1.000000;0.215240;,
  0.968058;0.204345;,
  0.968058;0.204345;,
  1.000000;0.215240;,
  1.000000;1.000000;,
  0.968058;0.168507;,
  0.968058;0.168507;,
  0.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;1.000000;,
  0.000000;0.215240;,
  0.031606;0.203277;,
  0.031606;0.203277;,
  0.000000;0.215240;,
  0.000000;1.000000;,
  0.031606;0.167439;,
  0.031606;0.167439;,
  0.000000;0.000000;,
  0.000000;0.000000;,
  0.474002;0.000000;,
  0.474002;0.000000;,
  0.474002;1.000000;,
  0.474002;1.000000;;
 }
}
