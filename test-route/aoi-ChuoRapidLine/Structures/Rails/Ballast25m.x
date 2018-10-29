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
 64;
 0.53500;-0.01300;-1.50205;,
 0.60000;-0.01300;-1.50205;,
 0.60000;-0.18700;-1.50205;,
 0.53500;-0.18700;-1.50205;,
 0.60000;-0.01300;-1.50205;,
 0.60000;-0.01300;25.00000;,
 0.60000;-0.18700;25.00000;,
 0.60000;-0.18700;-1.50205;,
 0.60000;-0.01300;25.00000;,
 0.53500;-0.01300;25.00000;,
 0.53500;-0.18700;25.00000;,
 0.60000;-0.18700;25.00000;,
 0.53500;-0.01300;25.00000;,
 0.53500;-0.01300;-1.50205;,
 0.53500;-0.18700;-1.50205;,
 0.53500;-0.18700;25.00000;,
 0.53500;-0.01300;25.00000;,
 0.60000;-0.01300;25.00000;,
 0.60000;-0.01300;-1.50205;,
 0.53500;-0.01300;-1.50205;,
 0.53500;-0.18700;-1.50205;,
 0.60000;-0.18700;-1.50205;,
 0.60000;-0.18700;25.00000;,
 0.53500;-0.18700;25.00000;,
 -0.53500;-0.01300;-1.50205;,
 -0.47000;-0.01300;-1.50205;,
 -0.47000;-0.18700;-1.50205;,
 -0.53500;-0.18700;-1.50205;,
 -0.47000;-0.01300;-1.50205;,
 -0.47000;-0.01300;25.00000;,
 -0.47000;-0.18700;25.00000;,
 -0.47000;-0.18700;-1.50205;,
 -0.47000;-0.01300;25.00000;,
 -0.53500;-0.01300;25.00000;,
 -0.53500;-0.18700;25.00000;,
 -0.47000;-0.18700;25.00000;,
 -0.53500;-0.01300;25.00000;,
 -0.53500;-0.01300;-1.50205;,
 -0.53500;-0.18700;-1.50205;,
 -0.53500;-0.18700;25.00000;,
 -0.53500;-0.01300;25.00000;,
 -0.47000;-0.01300;25.00000;,
 -0.47000;-0.01300;-1.50205;,
 -0.53500;-0.01300;-1.50205;,
 -0.53500;-0.18700;-1.50205;,
 -0.47000;-0.18700;-1.50205;,
 -0.47000;-0.18700;25.00000;,
 -0.53500;-0.18700;25.00000;,
 -1.00302;-0.18000;25.00000;,
 1.00101;-0.20000;25.00000;,
 1.00101;-0.20000;-1.50205;,
 -1.00302;-0.18000;-1.50205;,
 -1.11025;-0.12149;-1.50205;,
 -1.11025;-0.12149;25.00000;,
 -1.18342;-0.11931;-1.50205;,
 -2.50000;-0.60000;-1.50205;,
 -2.50000;-0.60000;25.00000;,
 -1.18342;-0.11931;25.00000;,
 1.10874;-0.12875;-1.50205;,
 1.10874;-0.12875;25.00000;,
 1.20341;-0.13401;-1.50205;,
 1.20341;-0.13401;25.00000;,
 2.50000;-0.60000;25.00000;,
 2.50000;-0.60000;-1.50205;;
 
 19;
 4;0,1,2,3;,
 4;4,5,6,7;,
 4;8,9,10,11;,
 4;12,13,14,15;,
 4;16,17,18,19;,
 4;20,21,22,23;,
 4;24,25,26,27;,
 4;28,29,30,31;,
 4;32,33,34,35;,
 4;36,37,38,39;,
 4;40,41,42,43;,
 4;44,45,46,47;,
 4;48,49,50,51;,
 4;52,53,48,51;,
 4;54,55,56,57;,
 4;54,57,53,52;,
 4;58,50,49,59;,
 4;60,58,59,61;,
 4;60,61,62,63;;
 
 MeshMaterialList {
  4;
  19;
  3,
  1,
  3,
  1,
  0,
  3,
  3,
  1,
  3,
  1,
  0,
  3,
  2,
  2,
  2,
  2,
  2,
  2,
  2;;
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "rail_top.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "rail_side.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "ballast.png";
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
  64;
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  -6.792634;-1.035750;,
  41.500038;-1.035750;,
  41.500038;0.059416;,
  -6.792634;0.059416;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  41.500038;-1.035750;,
  -6.792634;-1.035750;,
  -6.792634;0.059416;,
  41.500038;0.059416;,
  13.000000;5.940310;,
  13.000000;6.601282;,
  -0.251026;6.601282;,
  -0.251026;5.940310;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  -6.792634;-1.035750;,
  41.500038;-1.035750;,
  41.500038;0.059416;,
  -6.792634;0.059416;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  41.500038;-1.035750;,
  -6.792634;-1.035750;,
  -6.792634;0.059416;,
  41.500038;0.059416;,
  13.000000;-4.940310;,
  13.000000;-4.279337;,
  -0.251026;-4.279337;,
  -0.251026;-4.940310;,
  0.000000;0.000000;,
  1.000000;0.000000;,
  1.000000;1.000000;,
  0.000000;1.000000;,
  0.779525;-6.101776;,
  0.236961;-6.101776;,
  0.236961;0.896648;,
  0.779525;0.896648;,
  0.808554;0.896648;,
  0.808554;-6.101776;,
  0.828365;0.896648;,
  1.184810;0.896648;,
  1.184810;-6.101776;,
  0.828365;-6.101776;,
  0.207796;0.896648;,
  0.207796;-6.101776;,
  0.182164;0.896648;,
  0.182164;-6.101776;,
  -0.168869;-6.101776;,
  -0.168869;0.896648;;
 }
}
