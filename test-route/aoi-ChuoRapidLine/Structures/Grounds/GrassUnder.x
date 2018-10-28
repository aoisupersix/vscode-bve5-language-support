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
 2.72592;-4.36813;-0.32985;,
 -2.76980;-4.36813;-0.32985;,
 -2.76980;-4.36813;25.68782;,
 2.72592;-4.36813;25.68782;,
 -2.98965;0.00000;-0.32985;,
 -547.87288;0.00000;-0.32985;,
 -547.87288;0.00000;25.68782;,
 -2.98965;0.00000;25.68782;,
 -2.98965;0.00000;-0.32985;,
 -2.98965;0.00000;25.68782;,
 -2.76980;-4.36813;25.68782;,
 -2.76980;-4.36813;-0.32985;,
 2.98967;0.00000;-0.32985;,
 2.72592;-4.36813;-0.32985;,
 2.72592;-4.36813;25.68782;,
 2.98967;0.00000;25.68782;,
 2.98967;0.00000;-0.32985;,
 2.98967;0.00000;25.68782;,
 547.87288;0.00000;25.68782;,
 547.87288;0.00000;-0.32985;;
 
 5;
 4;0,1,2,3;,
 4;4,5,6,7;,
 4;8,9,10,11;,
 4;12,13,14,15;,
 4;16,17,18,19;;
 
 MeshMaterialList {
  2;
  5;
  0,
  0,
  1,
  1,
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
   0.298039;0.298039;0.298039;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
  }
 }
 MeshTextureCoords {
  20;
  3.295964;0.462817;,
  2.566803;0.462784;,
  2.566623;3.405527;,
  3.295783;3.405559;,
  2.537635;0.462783;,
  -69.756233;0.459556;,
  -69.756416;3.402298;,
  2.537454;3.405526;,
  0.103342;0.462674;,
  0.103161;3.405417;,
  0.132330;3.405418;,
  0.132511;0.462676;,
  0.896664;0.462710;,
  0.861671;0.462708;,
  0.861490;3.405451;,
  0.896484;3.405452;,
  3.330957;0.462819;,
  3.330776;3.405561;,
  75.624641;3.408788;,
  75.624825;0.466045;;
 }
}
