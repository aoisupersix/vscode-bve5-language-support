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
 37;
 -9.50000;11.94668;-4.00000;,
 9.45993;11.94668;-4.00000;,
 9.45993;0.03098;-4.00000;,
 -9.50000;0.03098;-4.00000;,
 -9.50000;11.94668;12.44968;,
 -9.50000;11.94668;-4.00000;,
 -9.50000;0.03098;-4.00000;,
 -9.50000;0.03098;12.44968;,
 9.45993;11.94668;-4.00000;,
 9.45993;11.94668;5.94366;,
 9.45993;11.94668;-4.00000;,
 9.45993;11.94668;5.94366;,
 9.45993;0.03098;5.94366;,
 9.45993;0.03098;-4.00000;,
 5.70846;13.90250;-1.00000;,
 7.70846;13.90250;-1.00000;,
 7.70846;11.90250;-1.00000;,
 5.70846;11.90250;-1.00000;,
 7.70846;13.90250;1.00000;,
 7.70846;11.90250;1.00000;,
 5.70846;13.90250;1.00000;,
 5.70846;11.90250;1.00000;,
 -9.78859;0.05323;-4.53118;,
 9.78859;0.05323;-4.53118;,
 9.78859;-2.14543;-4.53118;,
 -9.78859;-2.14543;-4.53118;,
 -9.78859;0.05323;13.00560;,
 -9.78859;0.05323;-4.53118;,
 -9.78859;-2.14543;-4.53118;,
 -9.78859;-2.14543;13.00560;,
 9.78859;0.05323;6.38867;,
 9.78859;0.05323;-4.53118;,
 -9.78859;0.05323;-4.53118;,
 9.78859;0.05323;-4.53118;,
 9.78859;0.05323;6.38867;,
 9.79554;-2.14543;6.38867;,
 9.78859;-2.14543;-4.53118;;
 
 12;
 4;0,1,2,3;,
 4;4,5,6,7;,
 4;8,5,4,9;,
 4;10,11,12,13;,
 4;14,15,16,17;,
 4;15,18,19,16;,
 4;20,14,17,21;,
 4;20,18,15,14;,
 4;22,23,24,25;,
 4;26,27,28,29;,
 4;26,30,31,32;,
 4;33,34,35,36;;
 
 MeshMaterialList {
  5;
  12;
  1,
  2,
  3,
  2,
  4,
  4,
  4,
  4,
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
    "konkuriKabe1.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "mBill1.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "mBill1.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "mBill1.png";
   }
  }
  Material {
   0.570980;0.570980;0.570980;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
  }
 }
 MeshTextureCoords {
  37;
  1.000956;0.069935;,
  0.001157;0.069935;,
  0.001157;3.835341;,
  1.000956;3.835341;,
  1.156499;0.069935;,
  0.289071;0.069935;,
  0.289071;3.835341;,
  1.156499;3.835341;,
  0.289071;0.069935;,
  0.813422;0.069935;,
  0.289071;0.069935;,
  0.813422;0.069935;,
  0.813422;3.835341;,
  0.289071;3.835341;,
  0.447268;-0.548112;,
  0.447268;-0.548112;,
  0.447268;0.083896;,
  0.447268;0.083896;,
  0.552732;-0.548112;,
  0.552732;0.083896;,
  0.552732;-0.548112;,
  0.552732;0.083896;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;;
 }
}
