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
 26;
 -0.81053;0.08610;-0.61940;,
 0.68946;0.08610;-0.61940;,
 0.68946;-0.52974;-0.61940;,
 -0.81053;-0.52974;-0.61940;,
 0.68946;0.33610;-0.33336;,
 -0.81053;0.33610;-0.33336;,
 0.93947;-0.52974;-0.33336;,
 0.93947;0.08610;-0.33336;,
 -1.06053;0.08610;-0.33336;,
 -1.06053;-0.52974;-0.33336;,
 0.93947;0.08610;-0.33336;,
 0.93947;0.08610;5.78134;,
 0.93947;-0.52974;5.78134;,
 0.93947;-0.52974;-0.33336;,
 0.68946;0.33610;5.78134;,
 0.93947;0.08610;5.78134;,
 0.93947;0.08610;-0.33336;,
 0.68946;0.33610;-0.33336;,
 -1.06053;0.08610;5.78134;,
 -1.06053;0.08610;-0.33336;,
 -1.06053;-0.52974;-0.33336;,
 -1.06053;-0.52974;5.78134;,
 -0.81053;0.33610;-0.33336;,
 -1.06053;0.08610;-0.33336;,
 -1.06053;0.08610;5.78134;,
 -0.81053;0.33610;5.78134;;
 
 11;
 4;0,1,2,3;,
 4;4,1,0,5;,
 4;6,2,1,7;,
 4;8,0,3,9;,
 3;8,5,0;,
 3;4,7,1;,
 4;10,11,12,13;,
 4;14,15,16,17;,
 4;18,19,20,21;,
 4;22,23,24,25;,
 4;25,14,17,22;;
 
 MeshMaterialList {
  2;
  11;
  0,
  0,
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
   0.467451;0.467451;0.467451;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "Grass.png";
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
  26;
  -1.775873;0.456931;,
  -1.025874;0.456931;,
  -1.025874;0.764849;,
  -1.775873;0.764849;,
  -1.025874;0.331931;,
  -1.775873;0.331931;,
  -0.900874;0.764849;,
  -0.900874;0.456931;,
  -1.900873;0.456931;,
  -1.900873;0.764849;,
  0.579719;0.333302;,
  0.579719;3.390652;,
  0.271906;3.390652;,
  0.271906;0.333302;,
  -1.025874;3.390652;,
  -0.900874;3.390652;,
  -0.900874;0.333302;,
  -1.025874;0.333302;,
  0.605891;3.390652;,
  0.605891;0.333302;,
  0.298078;0.333302;,
  0.298078;3.390652;,
  -1.775873;0.333302;,
  -1.900873;0.333302;,
  -1.900873;3.390652;,
  -1.775873;3.390652;;
 }
}
