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
 32;
 2.19385;-0.42765;4.98963;,
 2.19385;-0.42765;-0.34194;,
 0.68869;-0.42765;-0.34194;,
 0.68869;-0.42765;4.98963;,
 2.65651;-0.67865;-0.34194;,
 2.65651;-0.67865;4.98963;,
 2.96853;-1.18106;-0.34194;,
 2.65651;-0.67865;-0.34194;,
 2.65651;-0.67865;4.98963;,
 2.96853;-1.18106;4.98963;,
 5.61045;-9.79853;4.98963;,
 5.61045;-9.79853;-0.34194;,
 -2.19385;-0.42765;4.98963;,
 -0.68869;-0.42765;4.98963;,
 -0.68869;-0.42765;-0.34194;,
 -2.19385;-0.42765;-0.34194;,
 -2.65651;-0.67865;-0.34194;,
 -2.65651;-0.67865;4.98963;,
 -2.96853;-1.18106;-0.34194;,
 -2.96853;-1.18106;4.98963;,
 -2.65651;-0.67865;4.98963;,
 -2.65651;-0.67865;-0.34194;,
 -5.61045;-9.79853;-0.34194;,
 -5.61045;-9.79853;4.98963;,
 -2.65651;-0.67865;-0.34194;,
 -2.19385;-0.42765;-0.34194;,
 2.19385;-0.42765;-0.34194;,
 2.65651;-0.67865;-0.34194;,
 -2.96853;-1.18106;-0.34194;,
 2.96853;-1.18106;-0.34194;,
 5.61045;-9.79853;-0.34194;,
 -5.61045;-9.79853;-0.34194;;
 
 11;
 4;0,1,2,3;,
 4;4,1,0,5;,
 4;6,7,8,9;,
 4;6,9,10,11;,
 4;12,13,14,15;,
 4;16,17,12,15;,
 4;18,19,20,21;,
 4;18,22,23,19;,
 4;24,25,26,27;,
 4;28,24,27,29;,
 4;28,29,30,31;;
 
 MeshMaterialList {
  2;
  11;
  1,
  1,
  0,
  0,
  1,
  1,
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
    "Grass.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "Grass.png";
   }
  }
 }
 MeshTextureCoords {
  32;
  1.987610;1.579201;,
  1.987610;-0.579328;,
  1.471794;-0.579328;,
  1.471794;1.579201;,
  2.146163;-0.579328;,
  2.146163;1.579201;,
  0.329030;1.090532;,
  0.329030;0.839324;,
  2.994813;0.839324;,
  2.994813;1.090532;,
  2.994813;5.399268;,
  0.329030;5.399268;,
  0.483945;1.579201;,
  0.999762;1.579201;,
  0.999762;-0.579328;,
  0.483945;-0.579328;,
  0.325392;-0.579328;,
  0.325392;1.579201;,
  0.329030;1.090532;,
  2.994813;1.090532;,
  2.994813;0.839324;,
  0.329030;0.839324;,
  0.329030;5.399268;,
  2.994813;5.399268;,
  1.828253;0.839324;,
  1.596923;0.713826;,
  -0.596923;0.713826;,
  -0.828253;0.839324;,
  1.984266;1.090532;,
  -0.984266;1.090532;,
  -2.305227;5.399268;,
  3.305227;5.399268;;
 }
}
