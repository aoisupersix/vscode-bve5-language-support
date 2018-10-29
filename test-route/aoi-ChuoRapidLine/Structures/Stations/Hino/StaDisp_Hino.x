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
 78;
 -2.60914;4.47550;-0.06665;,
 -1.03494;4.47550;-0.06665;,
 -1.03494;3.80752;-0.04428;,
 -2.60914;3.80752;-0.04428;,
 -2.60914;4.47550;0.06665;,
 -2.60914;4.47550;-0.06665;,
 -2.60914;3.80752;-0.04428;,
 -2.60914;3.80752;0.04428;,
 -2.60914;3.80752;-0.04428;,
 -1.03494;3.80752;-0.04428;,
 -1.03494;3.80752;0.04428;,
 2.60914;4.47550;-0.06665;,
 2.60914;3.80752;-0.04428;,
 1.03494;3.80752;-0.04428;,
 1.03494;4.47550;-0.06665;,
 2.60914;4.47550;0.06665;,
 2.60914;3.80752;0.04428;,
 2.60914;3.80752;-0.04428;,
 2.60914;4.47550;-0.06665;,
 2.60914;3.80752;-0.04428;,
 1.03494;3.80752;0.04428;,
 1.03494;3.80752;-0.04428;,
 -1.23690;5.27889;-0.05168;,
 -1.18599;5.27889;-0.05168;,
 -1.18599;4.37040;-0.05168;,
 -1.23690;4.37040;-0.05168;,
 -1.18599;5.27889;-0.05168;,
 -1.18599;5.27889;0.05168;,
 -1.18599;4.37040;0.05168;,
 -1.18599;4.37040;-0.05168;,
 -1.23690;5.27889;0.05168;,
 -1.23690;5.27889;-0.05168;,
 -1.23690;4.37040;-0.05168;,
 -1.23690;4.37040;0.05168;,
 1.23690;5.27889;-0.05168;,
 1.23690;4.37040;-0.05168;,
 1.18599;4.37040;-0.05168;,
 1.18599;5.27889;-0.05168;,
 1.18599;5.27889;-0.05168;,
 1.18599;4.37040;-0.05168;,
 1.18599;4.37040;0.05168;,
 1.18599;5.27889;0.05168;,
 1.23690;5.27889;0.05168;,
 1.23690;4.37040;0.05168;,
 1.23690;4.37040;-0.05168;,
 1.23690;5.27889;-0.05168;,
 1.03494;4.47550;-0.06665;,
 1.03494;3.80752;-0.04428;,
 1.03494;3.80752;0.04428;,
 1.04269;4.47634;0.06027;,
 -1.03494;3.80752;-0.04428;,
 -1.03494;4.47550;-0.06665;,
 -1.03358;4.48034;0.05044;,
 -1.03494;3.80752;0.04428;,
 -2.59380;5.60324;-0.04719;,
 -2.54289;5.60324;-0.04719;,
 -2.54289;4.37040;-0.04719;,
 -2.59380;4.37040;-0.04719;,
 -2.54289;5.60324;-0.04719;,
 -2.54289;5.60324;0.05618;,
 -2.54289;4.37040;0.05618;,
 -2.54289;4.37040;-0.04719;,
 -2.59380;5.60324;0.05618;,
 -2.59380;5.60324;-0.04719;,
 -2.59380;4.37040;-0.04719;,
 -2.59380;4.37040;0.05618;,
 2.59380;5.60324;-0.04719;,
 2.59380;4.37040;-0.04719;,
 2.54289;4.37040;-0.04719;,
 2.54289;5.60324;-0.04719;,
 2.54289;5.60324;-0.04719;,
 2.54289;4.37040;-0.04719;,
 2.54289;4.37040;0.05618;,
 2.54289;5.60324;0.05618;,
 2.59380;5.60324;0.05618;,
 2.59380;4.37040;0.05618;,
 2.59380;4.37040;-0.04719;,
 2.59380;5.60324;-0.04719;;
 
 20;
 4;0,1,2,3;,
 4;4,5,6,7;,
 4;8,9,10,7;,
 4;11,12,13,14;,
 4;15,16,17,18;,
 4;19,16,20,21;,
 4;22,23,24,25;,
 4;26,27,28,29;,
 4;30,31,32,33;,
 4;34,35,36,37;,
 4;38,39,40,41;,
 4;42,43,44,45;,
 4;46,47,48,49;,
 4;50,51,52,53;,
 4;54,55,56,57;,
 4;58,59,60,61;,
 4;62,63,64,65;,
 4;66,67,68,69;,
 4;70,71,72,73;,
 4;74,75,76,77;;
 
 MeshMaterialList {
  5;
  20;
  0,
  3,
  3,
  2,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3;;
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "StaDisp_Hino2.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "watch.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "StaDisp_Hino1.png";
   }
  }
  Material {
   0.103200;0.103200;0.103200;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
  }
  Material {
   1.000000;1.000000;1.000000;1.000000;;
   0.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
  }
 }
 MeshTextureCoords {
  78;
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
  0.997180;0.017160;,
  0.997180;0.982850;,
  -0.002830;0.982850;,
  -0.002830;0.017160;,
  0.000000;0.000000;,
  0.000000;1.000000;,
  1.000000;1.000000;,
  1.000000;0.000000;,
  0.000000;0.000000;,
  1.000000;1.000000;,
  1.000000;0.000000;,
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
  0.000000;1.000000;,
  1.000000;1.000000;,
  1.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;1.000000;,
  1.000000;1.000000;,
  1.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;1.000000;,
  1.000000;1.000000;,
  1.000000;0.000000;,
  -0.002830;0.017160;,
  -0.002830;0.982850;,
  -0.002830;0.982850;,
  0.002090;0.015760;,
  -1.317720;0.982850;,
  -1.317720;0.017160;,
  -1.316850;0.009110;,
  -1.317720;0.982850;,
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
  0.000000;1.000000;,
  1.000000;1.000000;,
  1.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;1.000000;,
  1.000000;1.000000;,
  1.000000;0.000000;,
  0.000000;0.000000;,
  0.000000;1.000000;,
  1.000000;1.000000;,
  1.000000;0.000000;;
 }
}
