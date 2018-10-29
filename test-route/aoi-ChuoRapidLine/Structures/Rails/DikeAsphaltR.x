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
 61;
 2.59257;1.62563;-0.02177;,
 2.86055;1.62563;-0.02177;,
 3.78297;-0.63997;-0.02178;,
 1.67015;-0.63997;-0.02178;,
 2.86055;1.62563;-0.02177;,
 2.86055;1.62563;4.97822;,
 3.78297;-0.63997;4.97822;,
 3.78297;-0.63997;-0.02178;,
 2.59257;1.62563;4.97822;,
 2.59257;1.62563;-0.02177;,
 1.67015;-0.63997;-0.02178;,
 1.67015;-0.63997;4.97822;,
 2.59257;1.62563;4.97822;,
 2.86055;1.62563;4.97822;,
 2.71144;2.91698;5.02332;,
 2.71144;2.91698;-0.08467;,
 2.71144;1.61457;-0.08467;,
 2.71144;1.61457;5.02332;,
 2.70498;3.00576;2.46758;,
 2.72336;3.00576;2.47520;,
 2.72336;1.62956;2.47520;,
 2.70498;1.62956;2.46758;,
 2.73098;3.00576;2.49358;,
 2.73098;1.62956;2.49358;,
 2.72336;3.00576;2.51197;,
 2.72336;1.62956;2.51197;,
 2.70498;3.00576;2.51958;,
 2.70498;1.62956;2.51958;,
 2.68660;3.00576;2.51197;,
 2.68660;1.62956;2.51197;,
 2.67898;3.00576;2.49358;,
 2.67898;1.62956;2.49358;,
 2.68660;3.00576;2.47520;,
 2.68660;1.62956;2.47520;,
 2.70498;3.00576;2.49358;,
 2.70834;2.94936;5.02994;,
 2.72672;2.94175;5.02994;,
 2.72672;2.94175;-0.08792;,
 2.70834;2.94936;-0.08792;,
 2.73434;2.92336;5.02994;,
 2.73434;2.92336;-0.08792;,
 2.72672;2.90498;5.02994;,
 2.72672;2.90498;-0.08792;,
 2.70834;2.89736;5.02994;,
 2.70834;2.89736;-0.08792;,
 2.68995;2.90498;5.02994;,
 2.68995;2.90498;-0.08792;,
 2.68234;2.92336;5.02994;,
 2.68234;2.92336;-0.08792;,
 2.68995;2.94175;5.02994;,
 2.68995;2.94175;-0.08792;,
 2.70834;2.94936;5.02994;,
 2.70834;2.94936;-0.08792;,
 2.70834;2.92336;5.02994;,
 2.70834;2.92336;5.02994;,
 2.70834;2.92336;5.02994;,
 2.70834;2.92336;5.02994;,
 2.70834;2.92336;5.02994;,
 2.70834;2.92336;5.02994;,
 2.70834;2.92336;5.02994;,
 2.70834;2.92336;5.02994;;
 
 38;
 4;0,1,2,3;,
 4;4,5,6,7;,
 4;8,9,10,11;,
 4;12,13,1,0;,
 4;14,15,16,17;,
 4;15,14,17,16;,
 4;18,19,20,21;,
 4;19,22,23,20;,
 4;22,24,25,23;,
 4;24,26,27,25;,
 4;26,28,29,27;,
 4;28,30,31,29;,
 4;30,32,33,31;,
 4;32,18,21,33;,
 3;34,19,18;,
 3;34,22,19;,
 3;34,24,22;,
 3;34,26,24;,
 3;34,28,26;,
 3;34,30,28;,
 3;34,32,30;,
 3;34,18,32;,
 4;35,36,37,38;,
 4;36,39,40,37;,
 4;39,41,42,40;,
 4;41,43,44,42;,
 4;43,45,46,44;,
 4;45,47,48,46;,
 4;47,49,50,48;,
 4;49,51,52,50;,
 3;53,36,35;,
 3;54,39,36;,
 3;55,41,39;,
 3;56,43,41;,
 3;57,45,43;,
 3;58,47,45;,
 3;59,49,47;,
 3;60,51,49;;
 
 MeshMaterialList {
  4;
  38;
  0,
  0,
  0,
  1,
  2,
  2,
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
  0,
  0;;
  Material {
   0.414118;0.414118;0.414118;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "Asphalt.jpg";
   }
  }
  Material {
   0.586400;0.586400;0.586400;1.000000;;
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
    "fence.png";
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
  61;
  0.489110;26.863319;,
  0.489110;29.588409;,
  0.489110;29.588409;,
  0.489110;26.863319;,
  0.489112;-0.185471;,
  2.989112;-0.185471;,
  2.989112;2.539628;,
  0.489112;2.539628;,
  2.989112;-0.185471;,
  0.489112;-0.185471;,
  0.489112;2.539628;,
  2.989112;2.539628;,
  2.989110;26.863319;,
  2.989110;29.588409;,
  5.303396;-2.193575;,
  0.419029;-2.193575;,
  0.419029;-0.990912;,
  5.303396;-0.990912;,
  0.475138;-0.423412;,
  0.482420;-0.423412;,
  0.482420;1.423412;,
  0.475138;1.423412;,
  0.500000;-0.423412;,
  0.500000;1.423412;,
  0.517580;-0.423412;,
  0.517580;1.423412;,
  0.524862;-0.423412;,
  0.524862;1.423412;,
  0.517580;-0.423412;,
  0.517580;1.423412;,
  0.500000;-0.423412;,
  0.500000;1.423412;,
  0.482420;-0.423412;,
  0.482420;1.423412;,
  0.500000;-0.423412;,
  0.000000;0.000000;,
  0.125000;0.000000;,
  0.125000;1.000000;,
  0.000000;1.000000;,
  0.250000;0.000000;,
  0.250000;1.000000;,
  0.375000;0.000000;,
  0.375000;1.000000;,
  0.500000;0.000000;,
  0.500000;1.000000;,
  0.625000;0.000000;,
  0.625000;1.000000;,
  0.750000;0.000000;,
  0.750000;1.000000;,
  0.875000;0.000000;,
  0.875000;1.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.062500;0.000000;,
  0.187500;0.000000;,
  0.312500;0.000000;,
  0.437500;0.000000;,
  0.562500;0.000000;,
  0.687500;0.000000;,
  0.812500;0.000000;,
  0.937500;0.000000;;
 }
}