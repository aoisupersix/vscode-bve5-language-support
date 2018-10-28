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
 27;
 -513.74999;6.71881;-3.56610;,
 -513.74999;6.71881;5.31941;,
 -7.19930;6.71881;5.31941;,
 -7.69929;6.71881;-0.01678;,
 -6.97555;6.32408;-0.22382;,
 -7.47554;6.32408;-0.72683;,
 -3.80352;0.23178;-3.25985;,
 -3.80352;0.72351;5.31941;,
 -3.80352;-11.14325;5.31941;,
 -3.80352;-10.64666;-4.53654;,
 -4.02727;0.59042;-2.99152;,
 -4.30351;0.23178;-3.76285;,
 -4.30351;-10.64666;-5.03953;,
 -4.52726;0.59042;-3.49451;,
 -4.02727;0.59042;-2.99152;,
 -3.80352;0.72351;5.31941;,
 -7.47554;6.32408;-0.72683;,
 -6.97555;6.32408;-0.22382;,
 -4.02727;0.59042;-2.99152;,
 -4.52726;0.59042;-3.49451;,
 -513.74999;0.19570;-6.75391;,
 -513.74999;6.71881;-3.56610;,
 -513.74999;0.19570;-6.75391;,
 -4.52726;0.59042;-3.49451;,
 -4.30351;0.23178;-3.76285;,
 -4.30351;-10.64666;-5.03953;,
 -513.74999;-11.14325;-8.14715;;
 
 13;
 4;0,1,2,3;,
 3;4,3,2;,
 3;0,3,5;,
 3;4,5,3;,
 4;6,7,8,9;,
 3;7,6,10;,
 4;11,6,9,12;,
 4;11,13,10,6;,
 4;14,4,2,15;,
 4;16,17,18,19;,
 4;19,20,21,16;,
 3;22,23,24;,
 4;24,25,26,22;;
 
 MeshMaterialList {
  3;
  13;
  0,
  0,
  0,
  0,
  2,
  2,
  2,
  2,
  0,
  0,
  0,
  2,
  2;;
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
   0.298400;0.298400;0.298400;1.000000;;
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
    "wallSide.png";
   }
  }
 }
 MeshTextureCoords {
  27;
  71.097496;0.099805;,
  71.097435;1.104806;,
  3.889443;1.101806;,
  3.955818;0.498257;,
  3.859794;0.474835;,
  3.926135;0.417944;,
  -1.221783;1.119744;,
  0.067650;1.128282;,
  0.067650;3.811357;,
  -1.413663;3.693852;,
  -1.181453;1.034880;,
  -1.297381;1.119744;,
  -1.489261;3.693852;,
  -1.257051;1.034880;,
  3.468643;0.161775;,
  3.438897;1.101786;,
  3.926135;-0.169678;,
  3.859794;-0.184402;,
  3.468643;0.523035;,
  3.534984;0.537759;,
  71.097519;0.675519;,
  71.097496;-0.130461;,
  17.793451;1.002238;,
  0.652393;0.908836;,
  0.644861;1.119744;,
  0.644861;3.693852;,
  17.793451;3.811357;;
 }
}
