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
 -1.90000;6.26254;0.87946;,
 -1.90000;-0.04000;0.87946;,
 -2.23577;-0.04000;0.31243;,
 -2.23577;6.26254;0.31243;,
 -1.90000;6.26254;10.00000;,
 -1.90000;-0.04000;10.00000;,
 -2.68016;6.26254;-0.00285;,
 -2.68016;-0.04000;-0.00285;,
 -10.35259;-0.04000;0.00000;,
 -10.35259;6.26254;0.00000;,
 -2.23577;6.26254;0.31243;,
 -2.23577;-0.04000;0.31243;,
 -0.69381;0.77997;-0.49019;,
 -2.97243;-0.40568;-1.30151;,
 -2.92764;1.02412;-0.50722;,
 1.25443;0.58937;-0.50722;,
 4.05562;0.00000;-0.50722;,
 1.25443;0.58937;12.64535;,
 1.25443;0.58937;-0.50722;,
 -2.92764;1.02412;-0.50722;,
 -2.92764;1.02412;12.64535;,
 8.63498;-0.96767;12.64535;,
 8.63498;-0.96767;-0.50722;,
 -0.65783;0.72515;12.57582;,
 -2.92764;1.02412;12.64535;,
 -3.13501;-0.45416;13.12599;,
 4.05562;0.00000;12.64535;,
 1.25443;0.58937;12.64535;;
 
 10;
 4;0,1,2,3;,
 4;0,4,5,1;,
 4;6,7,8,9;,
 4;6,10,11,7;,
 3;12,13,14;,
 4;12,15,16,13;,
 4;17,18,19,20;,
 4;17,21,22,18;,
 3;23,24,25;,
 4;23,25,26,27;;
 
 MeshMaterialList {
  3;
  10;
  0,
  0,
  1,
  1,
  2,
  2,
  2,
  2,
  2,
  2;;
  Material {
   0.656000;0.656000;0.656000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "treewall.png";
   }
  }
  Material {
   0.696800;0.696800;0.696800;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "treewall.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "treeGr.png";
   }
  }
 }
 MeshTextureCoords {
  28;
  0.752802;0.023231;,
  0.752802;0.956413;,
  0.787356;0.956413;,
  0.787356;0.023231;,
  0.197009;0.023231;,
  0.197009;0.956413;,
  0.770287;0.003079;,
  0.770287;1.029017;,
  1.544031;1.029017;,
  1.544031;0.003079;,
  0.725471;0.003079;,
  0.725471;1.029017;,
  0.637300;0.585417;,
  0.736193;0.865947;,
  0.639375;0.860433;,
  0.639375;0.345562;,
  0.639375;0.000696;,
  -0.963814;0.345562;,
  0.639375;0.345562;,
  0.639375;0.860433;,
  -0.963814;0.860433;,
  -0.963814;-0.563086;,
  0.639375;-0.563086;,
  -0.955339;0.580988;,
  -0.963814;0.860433;,
  -1.022400;0.885964;,
  -0.963814;0.000696;,
  -0.963814;0.345562;;
 }
}
