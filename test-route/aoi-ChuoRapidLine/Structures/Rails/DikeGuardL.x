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
 25;
 -3.17210;0.87324;-0.33257;,
 -3.17210;-0.58318;-0.33257;,
 -3.24352;-0.58318;-0.30299;,
 -3.24352;0.87324;-0.30299;,
 -3.27310;-0.58318;-0.23157;,
 -3.27310;0.87324;-0.23157;,
 -3.24352;-0.58318;-0.16016;,
 -3.24352;0.87324;-0.16016;,
 -3.17210;-0.58318;-0.13057;,
 -3.17210;0.87324;-0.13057;,
 -3.10068;-0.58318;-0.16016;,
 -3.10068;0.87324;-0.16016;,
 -3.07110;-0.58318;-0.23157;,
 -3.07110;0.87324;-0.23157;,
 -3.10068;-0.58318;-0.30299;,
 -3.10068;0.87324;-0.30299;,
 -3.17210;0.87324;-0.23157;,
 -3.18343;0.11314;5.83800;,
 -3.18343;0.75607;5.83800;,
 -3.18343;0.75607;-0.22219;,
 -3.18343;0.11314;-0.22219;,
 -3.18343;0.75607;-0.22219;,
 -3.18343;0.75607;5.83800;,
 -3.18343;0.11314;5.83800;,
 -3.18343;0.11314;-0.22219;;
 
 18;
 4;0,1,2,3;,
 4;3,2,4,5;,
 4;5,4,6,7;,
 4;7,6,8,9;,
 4;9,8,10,11;,
 4;11,10,12,13;,
 4;13,12,14,15;,
 4;15,14,1,0;,
 3;16,0,3;,
 3;16,3,5;,
 3;16,5,7;,
 3;16,7,9;,
 3;16,9,11;,
 3;16,11,13;,
 3;16,13,15;,
 3;16,15,0;,
 4;17,18,19,20;,
 4;21,22,23,24;;
 
 MeshMaterialList {
  5;
  18;
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  2,
  3;;
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "road2.png";
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
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "guard-Ura.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "guard-Omote.png";
   }
  }
  Material {
   0.467451;0.467451;0.467451;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
  }
 }
 MeshTextureCoords {
  25;
  0.065233;0.067877;,
  0.065233;0.067877;,
  0.051998;0.072527;,
  0.051998;0.072527;,
  0.046516;0.083754;,
  0.046516;0.083754;,
  0.051998;0.094980;,
  0.051998;0.094980;,
  0.065233;0.099631;,
  0.065233;0.099631;,
  0.078468;0.094980;,
  0.078468;0.094980;,
  0.083951;0.083754;,
  0.083951;0.083754;,
  0.078468;0.072527;,
  0.078468;0.072527;,
  0.065233;0.083754;,
  0.000843;1.008317;,
  0.000843;-0.009100;,
  0.997222;-0.009100;,
  0.997222;1.008317;,
  0.821696;0.958538;,
  2.689571;0.958538;,
  2.689571;0.051392;,
  0.821696;0.051392;;
 }
}
