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
 -8.30073;19.99145;16.07841;,
 -8.30075;19.99145;-15.34340;,
 -8.30075;-0.00854;-15.34340;,
 -8.30073;-0.00854;16.07841;,
 -8.30075;19.99145;-15.34340;,
 7.56573;19.99145;-15.34341;,
 7.56573;-0.00854;-15.34341;,
 -8.30075;-0.00854;-15.34340;,
 7.56573;19.99145;-15.34341;,
 7.56576;19.99145;16.07839;,
 7.56576;-0.00854;16.07839;,
 7.56573;-0.00854;-15.34341;,
 7.56576;19.99145;16.07839;,
 -8.30073;19.99145;16.07841;,
 -8.30073;-0.00854;16.07841;,
 7.56576;-0.00854;16.07839;,
 -8.30075;19.99145;-15.34340;,
 -8.30073;19.99145;16.07841;,
 -10.97093;0.00910;22.20292;,
 -10.97098;0.00910;-21.46791;,
 -10.97098;-9.99089;-21.46791;,
 -10.97093;-9.99089;22.20292;,
 10.97093;0.00910;-21.46793;,
 10.97093;-9.99089;-21.46793;,
 10.97097;0.00910;22.20290;,
 10.97097;-9.99089;22.20290;,
 -6.47833;28.44545;-3.04319;,
 6.03736;28.44545;-6.94411;,
 6.03736;20.03431;-6.94411;,
 -6.47833;20.03431;-3.04319;,
 -6.47833;28.44545;-3.04319;,
 -6.47833;20.03431;-3.04319;,
 -6.47832;20.03431;10.29750;,
 -6.47832;28.44545;10.29750;;
 
 12;
 4;0,1,2,3;,
 4;4,5,6,7;,
 4;8,9,10,11;,
 4;12,13,14,15;,
 4;12,5,16,17;,
 4;18,19,20,21;,
 4;19,22,23,20;,
 4;22,24,25,23;,
 4;24,18,21,25;,
 4;18,24,22,19;,
 4;26,27,28,29;,
 4;30,31,32,33;;
 
 MeshMaterialList {
  6;
  12;
  0,
  1,
  0,
  1,
  3,
  2,
  2,
  2,
  2,
  2,
  5,
  4;;
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "Bill3.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "Bill3-2.png";
   }
  }
  Material {
   0.614902;0.614902;0.614902;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "konkuriKabe1.png";
   }
  }
  Material {
   0.357647;0.357647;0.357647;1.000000;;
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
    "iei.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "iei.png";
   }
  }
 }
 MeshTextureCoords {
  34;
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  1.263643;0.495171;,
  1.263643;0.495171;,
  1.263643;5.803571;,
  1.263643;5.803571;,
  -0.251026;0.495171;,
  -0.251026;5.803571;,
  -0.251026;0.495171;,
  -0.251026;5.803571;,
  -0.025278;-3.009854;,
  1.033589;-3.009854;,
  1.033589;-1.984605;,
  -0.025278;-1.984605;,
  1.041414;-3.009854;,
  1.041414;-1.984605;,
  -0.055150;-1.984605;,
  -0.055150;-3.009854;;
 }
}
