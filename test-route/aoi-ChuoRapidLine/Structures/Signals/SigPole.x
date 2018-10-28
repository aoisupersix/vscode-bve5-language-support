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
 31;
 0.02017;5.29204;0.02878;,
 0.04235;5.29204;0.03806;,
 0.06252;-0.28586;0.04651;,
 0.00000;-0.28586;0.02034;,
 0.02696;5.31674;0.05361;,
 0.02017;5.31674;0.05066;,
 0.07082;5.29204;0.06674;,
 -0.02017;5.29204;0.02878;,
 -0.02017;5.31674;0.05066;,
 0.05543;5.31674;0.08229;,
 0.08012;5.29204;0.08943;,
 0.08842;-0.28586;0.10967;,
 0.05825;5.31674;0.08943;,
 0.08012;5.29204;0.12991;,
 0.05825;5.31674;0.12991;,
 -0.08843;-0.28586;0.10967;,
 -0.08013;5.29204;0.12991;,
 -0.08013;5.29204;0.08943;,
 -0.05826;5.31674;0.12991;,
 -0.05826;5.31674;0.08943;,
 -0.07083;5.29204;0.06674;,
 -0.06253;-0.28586;0.04651;,
 -0.05544;5.31674;0.08229;,
 -0.04235;5.29204;0.03806;,
 -0.02697;5.31674;0.05361;,
 0.01539;5.31674;0.07225;,
 0.03726;5.31674;0.09413;,
 -0.01539;5.31674;0.07225;,
 0.03726;5.31674;0.12522;,
 -0.03726;5.31674;0.12522;,
 -0.03726;5.31674;0.09413;;
 
 27;
 4;0,1,2,3;,
 4;4,1,0,5;,
 3;2,1,6;,
 3;7,0,3;,
 4;7,8,5,0;,
 4;4,9,6,1;,
 4;6,10,11,2;,
 4;12,10,6,9;,
 3;11,10,13;,
 4;12,14,13,10;,
 3;15,16,17;,
 4;18,19,17,16;,
 4;17,20,21,15;,
 4;22,20,17,19;,
 3;21,20,23;,
 4;22,24,23,20;,
 4;23,7,3,21;,
 4;8,7,23,24;,
 3;25,4,5;,
 4;9,4,25,26;,
 4;27,25,5,8;,
 3;26,12,9;,
 4;14,12,26,28;,
 4;19,18,29,30;,
 3;30,22,19;,
 4;24,22,30,27;,
 3;27,8,24;;
 
 MeshMaterialList {
  1;
  27;
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
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "pole.png";
   }
  }
 }
 MeshTextureCoords {
  31;
  0.363767;-2.606242;,
  0.482299;-2.606242;,
  0.590146;3.633870;,
  0.255916;3.633870;,
  0.497993;-2.633870;,
  0.461231;-2.633870;,
  0.709206;-2.606242;,
  0.223299;-2.606242;,
  0.320762;-2.633870;,
  0.724908;-2.633870;,
  0.842698;-2.606242;,
  0.961758;3.633870;,
  0.766565;-2.633870;,
  1.023045;-2.606242;,
  0.946913;-2.633870;,
  0.346097;3.633870;,
  0.465164;-2.606242;,
  0.284817;-2.606242;,
  0.541293;-2.633870;,
  0.360946;-2.633870;,
  0.216102;-2.606242;,
  0.154822;3.633870;,
  0.338928;-2.633870;,
  0.187439;-2.606242;,
  0.310262;-2.633870;,
  0.540779;-2.633870;,
  0.714372;-2.633870;,
  0.433659;-2.633870;,
  0.852894;-2.633870;,
  0.593502;-2.633870;,
  0.454989;-2.633870;;
 }
}
