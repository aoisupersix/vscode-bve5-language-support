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
 24;
 8.50000;1.34277;-13.00000;,
 8.50000;-0.06739;-13.00000;,
 -8.50000;-0.06739;-13.00000;,
 -8.50000;1.34277;-13.00000;,
 8.50000;1.34277;3.04484;,
 8.50000;-0.06739;3.04484;,
 8.50000;-0.06739;-13.00000;,
 8.50000;1.34277;-13.00000;,
 8.50000;1.34277;3.62986;,
 8.50000;1.34277;13.00000;,
 8.50000;-0.06739;13.00000;,
 8.50000;-0.06739;3.62986;,
 9.63400;1.97780;3.62986;,
 9.63400;10.93261;3.62986;,
 9.63400;10.93261;13.00000;,
 9.63400;1.97780;13.00000;,
 8.50000;1.97780;3.04484;,
 8.50000;10.93261;3.04484;,
 8.50000;1.97780;-13.00000;,
 8.50000;10.93261;-13.00000;,
 8.50000;1.97780;-13.00000;,
 -8.50000;1.97780;-13.00000;,
 -8.50000;10.93261;-13.00000;,
 8.50000;10.93261;-13.00000;;
 
 12;
 4;0,1,2,3;,
 4;4,5,6,7;,
 4;8,9,10,11;,
 4;8,11,5,4;,
 4;12,13,14,15;,
 4;12,15,9,8;,
 4;12,8,4,16;,
 4;12,16,17,13;,
 4;16,4,7,18;,
 4;16,18,19,17;,
 4;20,0,3,21;,
 4;20,21,22,23;;
 
 MeshMaterialList {
  2;
  12;
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0;;
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "aska-side1.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "aska-side2.png";
   }
  }
 }
 MeshTextureCoords {
  24;
  1.000000;0.871803;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  0.000000;0.871803;,
  0.617109;0.871803;,
  0.617109;1.000000;,
  0.000000;1.000000;,
  0.000000;0.871803;,
  0.639610;0.871803;,
  1.000000;0.871803;,
  1.000000;1.000000;,
  0.639610;1.000000;,
  0.639610;0.814073;,
  0.639610;0.000000;,
  1.000000;0.000000;,
  1.000000;0.814073;,
  0.617109;0.814073;,
  0.617109;0.000000;,
  0.000000;0.814073;,
  0.000000;0.000000;,
  1.000000;0.814073;,
  0.000000;0.814073;,
  0.000000;0.000000;,
  1.000000;0.000000;;
 }
}
