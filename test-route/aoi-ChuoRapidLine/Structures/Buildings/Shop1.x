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
 7.75666;7.88253;-1.50110;,
 7.75666;7.88253;8.83976;,
 7.75666;-0.06956;8.83976;,
 7.75666;-0.06956;-1.50110;,
 -7.75666;7.88253;8.83976;,
 -7.75666;7.88253;-1.50110;,
 -7.75666;-0.06956;-1.50110;,
 -7.75666;-0.06956;8.83976;,
 -0.02097;7.80319;8.83976;,
 -7.75666;7.88253;8.83976;,
 -7.75666;-0.06956;8.83976;,
 -0.02097;-0.06956;8.83976;,
 7.75666;-0.06956;8.83976;,
 7.75666;7.88253;8.83976;,
 -0.02097;-0.06956;-1.50110;,
 -7.75666;-0.06956;-1.50110;,
 -7.75666;7.88253;-1.50110;,
 -0.02097;7.80319;-1.50110;,
 7.75666;7.88253;-1.50110;,
 7.75666;-0.06956;-1.50110;,
 -7.92705;0.00910;-1.78142;,
 7.98149;0.00910;-1.78142;,
 7.98149;-9.99089;-1.78142;,
 -7.92705;-9.99089;-1.78142;,
 7.98149;0.00910;9.19382;,
 7.98149;-9.99089;9.19382;,
 -7.92705;0.00910;9.19382;,
 -7.92705;-9.99089;9.19382;,
 -0.02097;7.80319;8.83976;,
 7.75666;7.88253;8.83976;,
 7.75666;7.88253;-1.50110;,
 -0.02097;7.80319;-1.50110;,
 -7.75666;7.88253;-1.50110;,
 -7.75666;7.88253;8.83976;;
 
 13;
 4;0,1,2,3;,
 4;4,5,6,7;,
 4;8,9,10,11;,
 4;8,11,12,13;,
 4;14,15,16,17;,
 4;14,17,18,19;,
 4;20,21,22,23;,
 4;21,24,25,22;,
 4;24,26,27,25;,
 4;26,20,23,27;,
 4;20,26,24,21;,
 4;28,29,30,31;,
 4;28,31,32,33;;
 
 MeshMaterialList {
  5;
  13;
  1,
  1,
  0,
  0,
  0,
  0,
  3,
  3,
  3,
  3,
  3,
  2,
  2;;
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "shop1.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "shop1.png";
   }
  }
  Material {
   0.564800;0.564800;0.564800;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
  }
  Material {
   0.615200;0.615200;0.615200;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "konkuriKabe1.png";
   }
  }
  Material {
   0.357600;0.357600;0.357600;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
  }
 }
 MeshTextureCoords {
  34;
  0.013150;0.000160;,
  1.040510;0.000160;,
  1.040510;0.992230;,
  0.013150;0.992230;,
  1.040510;0.000160;,
  0.013150;0.000160;,
  0.013150;0.992230;,
  1.040510;0.992230;,
  0.498680;-0.965920;,
  -0.008110;-0.976370;,
  -0.008110;-0.044200;,
  0.498680;-0.044200;,
  1.008220;-0.044200;,
  1.008220;-0.976370;,
  0.498680;-0.044200;,
  -0.008110;-0.044200;,
  -0.008110;-0.976370;,
  0.498680;-0.965920;,
  1.008220;-0.976370;,
  1.008220;-0.044200;,
  1.263640;0.495170;,
  1.263640;0.495170;,
  1.263640;5.803570;,
  1.263640;5.803570;,
  -0.251030;0.495170;,
  -0.251030;5.803570;,
  -0.251030;0.495170;,
  -0.251030;5.803570;,
  0.489510;4.919880;,
  4.378330;4.919880;,
  4.378330;-0.250550;,
  0.489510;-0.250550;,
  -3.378330;-0.250550;,
  -3.378330;4.919880;;
 }
}
