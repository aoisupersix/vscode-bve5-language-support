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
 211;
 -12.90041;7.50000;-1.00000;,
 14.25931;7.50000;-1.00000;,
 14.25931;5.50000;-1.00000;,
 -12.90041;5.50000;-1.00000;,
 -12.90041;5.50000;2.05208;,
 14.25931;5.50000;2.05208;,
 14.25931;5.50000;2.18110;,
 -12.90041;5.50000;2.18110;,
 -12.90041;5.50000;-0.86691;,
 -12.90041;5.50000;-1.00000;,
 14.25931;5.50000;-1.00000;,
 14.25931;5.50000;-0.86691;,
 -12.90041;5.50000;-0.73285;,
 14.25931;5.50000;-0.73285;,
 -12.90041;5.50000;1.92969;,
 14.25931;5.50000;1.92969;,
 -15.90684;0.50000;-12.38403;,
 -15.99398;-1.50000;-12.38403;,
 -16.18196;-1.50000;-12.38403;,
 -16.18196;0.50000;-12.38403;,
 -13.10241;0.50000;-12.38403;,
 -12.85744;0.50000;-12.38403;,
 -12.85744;-1.50000;-12.38403;,
 -13.02774;-1.50000;-12.38403;,
 -15.90684;-1.38497;-12.38403;,
 -15.90684;-1.50000;-12.38403;,
 -13.10241;-1.38497;-12.38403;,
 -13.10241;-1.50000;-12.38403;,
 -16.18790;7.50900;-1.09844;,
 -16.18196;0.50000;-12.38403;,
 -16.18196;-1.50000;-12.38403;,
 -16.18790;5.50901;-1.00177;,
 -16.18790;7.50900;-1.09844;,
 -16.18790;5.50901;-1.00177;,
 -16.18795;5.50034;2.17491;,
 -16.18795;7.56697;2.17491;,
 -16.18790;7.50900;-1.09844;,
 -16.18795;7.56697;2.17491;,
 -15.99997;7.56697;2.17491;,
 -15.99919;7.50900;-1.09844;,
 -15.90684;0.50000;-12.38403;,
 -16.18196;0.50000;-12.38403;,
 -16.18196;-1.50000;-12.38403;,
 -15.99398;-1.50000;-12.38403;,
 -15.99992;5.50901;-1.00177;,
 -16.18790;5.50901;-1.00177;,
 -15.99992;5.50901;-1.00177;,
 -15.99997;5.50034;2.17491;,
 -16.18795;5.50034;2.17491;,
 -15.99919;7.50900;-1.09844;,
 -15.99997;7.56697;2.17491;,
 -15.99974;5.61537;2.17491;,
 -16.00042;5.62404;-1.00177;,
 -15.99919;7.50900;-1.09844;,
 -16.00042;5.62404;-1.00177;,
 -15.90684;-1.38497;-12.38403;,
 -15.90684;0.50000;-12.38403;,
 -15.90684;-1.50000;-12.38403;,
 -15.82644;5.50901;-1.00177;,
 -15.82644;5.50901;-1.00177;,
 -15.82576;5.50034;2.17491;,
 -16.00042;5.62404;-1.00177;,
 -15.99974;5.61537;2.17491;,
 -13.18316;5.61537;2.17491;,
 -13.18248;5.62403;-1.00177;,
 -13.10241;-1.38497;-12.38403;,
 -15.90684;-1.38497;-12.38403;,
 -13.10241;-1.50000;-12.38403;,
 -13.18248;5.50901;-1.00177;,
 -13.18248;5.50901;-1.00177;,
 -13.18316;5.50034;2.17491;,
 -13.18248;5.62403;-1.00177;,
 -13.03430;7.50900;-1.09844;,
 -13.10241;0.50000;-12.38403;,
 -13.10241;-1.38497;-12.38403;,
 -13.02774;-1.50000;-12.38403;,
 -13.03368;5.50901;-1.00177;,
 -13.03368;5.50901;-1.00177;,
 -13.03372;5.50034;2.17491;,
 -13.03430;7.50900;-1.09844;,
 -12.86338;7.50900;-1.09844;,
 -12.85744;0.50000;-12.38403;,
 -13.10241;0.50000;-12.38403;,
 -12.85744;-1.50000;-12.38403;,
 -12.86338;5.50901;-1.00177;,
 -12.86338;5.50901;-1.00177;,
 -12.86343;5.50034;2.17491;,
 -12.86338;7.50900;-1.09844;,
 -12.86338;5.50901;-1.00177;,
 -12.85744;-1.50000;-12.38403;,
 -12.85744;0.50000;-12.38403;,
 -16.18255;7.50054;2.01202;,
 -12.90203;7.50054;2.01202;,
 -12.90203;5.50054;2.01202;,
 -16.18255;5.50054;2.01202;,
 -12.90203;7.50054;2.01202;,
 -12.90203;7.50054;2.18110;,
 -12.90203;5.50054;2.18110;,
 -12.90203;5.50054;2.01202;,
 -16.18255;7.50054;2.18110;,
 -16.18255;7.50054;2.01202;,
 -16.18255;5.50054;2.01202;,
 -16.18255;5.50054;2.18110;,
 -16.18255;5.50054;2.01202;,
 -12.90203;5.50054;2.01202;,
 -12.90203;5.50054;2.18110;,
 -16.18255;5.50054;2.18110;,
 14.43921;0.50000;13.56515;,
 14.19424;0.50000;13.56515;,
 14.19424;-1.50000;13.56515;,
 14.36454;-1.50000;13.56515;,
 14.43921;-1.38497;13.56515;,
 14.43921;-1.50000;13.56515;,
 17.52469;5.50901;2.27954;,
 17.51876;-1.50000;13.56515;,
 17.33078;-1.50000;13.56515;,
 17.33671;5.50901;2.27954;,
 17.33677;5.50034;-0.99381;,
 17.52474;5.50034;-0.99381;,
 17.33599;7.50900;2.27954;,
 17.33677;7.56697;-0.99381;,
 17.16255;5.61537;-0.99381;,
 17.16323;5.62404;2.27954;,
 17.24363;-1.50000;13.56515;,
 17.16323;5.50901;2.27954;,
 17.16255;5.50034;-0.99381;,
 14.43921;-1.50000;13.56515;,
 14.51928;5.50901;2.27954;,
 14.51995;5.50034;-0.99381;,
 14.36454;-1.50000;13.56515;,
 14.37047;5.50901;2.27954;,
 14.37052;5.50034;-0.99381;,
 14.37110;7.50900;2.27954;,
 14.20018;7.50900;2.27954;,
 14.19424;0.50000;13.56515;,
 14.43921;0.50000;13.56515;,
 14.19424;-1.50000;13.56515;,
 14.20018;5.50901;2.27954;,
 14.20023;5.50034;-0.99381;,
 14.20018;7.50900;2.27954;,
 14.20018;5.50901;2.27954;,
 14.19424;-1.50000;13.56515;,
 14.19424;0.50000;13.56515;,
 17.51935;7.50054;-0.83092;,
 14.23883;7.50054;-0.83092;,
 14.23883;5.50054;-0.83092;,
 17.51935;5.50054;-0.83092;,
 14.23883;7.50054;-1.00000;,
 17.51935;7.50054;-1.00000;,
 17.51935;5.50054;-1.00000;,
 14.23883;5.50054;-1.00000;,
 17.51935;5.50054;-0.83092;,
 14.23883;5.50054;-0.83092;,
 14.23883;5.50054;-1.00000;,
 17.51935;5.50054;-1.00000;,
 -14.69169;5.50364;0.37731;,
 -14.49118;5.50364;0.45954;,
 -14.49118;-4.02448;0.45954;,
 -14.69169;-4.02448;0.37731;,
 -14.40813;5.50364;0.65806;,
 -14.40813;-4.02448;0.65806;,
 -14.49118;5.50364;0.85658;,
 -14.49118;-4.02448;0.85658;,
 -14.89221;5.50364;0.85658;,
 -14.97526;5.50364;0.65806;,
 -14.97526;-4.02448;0.65806;,
 -14.89221;-4.02448;0.85658;,
 -14.89221;5.50364;0.45954;,
 -14.89221;-4.02448;0.45954;,
 15.82448;5.50364;0.37731;,
 15.82448;-4.02448;0.37731;,
 15.62397;-4.02448;0.45954;,
 15.62397;5.50364;0.45954;,
 15.54092;-4.02448;0.65806;,
 15.54092;5.50364;0.65806;,
 15.62397;-4.02448;0.85658;,
 15.62397;5.50364;0.85658;,
 16.02501;5.50364;0.85658;,
 16.02501;-4.02448;0.85658;,
 16.10806;-4.02448;0.65806;,
 16.10806;5.50364;0.65806;,
 16.02501;-4.02448;0.45954;,
 16.02501;5.50364;0.45954;,
 -6.79873;5.50364;0.37731;,
 -6.59822;5.50364;0.45954;,
 -6.59822;-4.02448;0.45954;,
 -6.79873;-4.02448;0.37731;,
 -6.51516;5.50364;0.65806;,
 -6.51516;-4.02448;0.65806;,
 -6.59822;5.50364;0.85658;,
 -6.59822;-4.02448;0.85658;,
 -6.99925;5.50364;0.85658;,
 -7.08231;5.50364;0.65806;,
 -7.08231;-4.02448;0.65806;,
 -6.99925;-4.02448;0.85658;,
 -6.99925;5.50364;0.45954;,
 -6.99925;-4.02448;0.45954;,
 3.45492;5.50364;0.37731;,
 3.65543;5.50364;0.45954;,
 3.65543;-4.02448;0.45954;,
 3.45492;-4.02448;0.37731;,
 3.73849;5.50364;0.65806;,
 3.73849;-4.02448;0.65806;,
 3.65543;5.50364;0.85658;,
 3.65543;-4.02448;0.85658;,
 3.25440;5.50364;0.85658;,
 3.17134;5.50364;0.65806;,
 3.17134;-4.02448;0.65806;,
 3.25440;-4.02448;0.85658;,
 3.25440;5.50364;0.45954;,
 3.25440;-4.02448;0.45954;;
 
 79;
 4;0,1,2,3;,
 4;4,5,6,7;,
 4;8,9,10,11;,
 4;12,8,11,13;,
 4;14,12,13,15;,
 4;14,15,5,4;,
 4;16,17,18,19;,
 4;20,21,22,23;,
 4;24,25,17,16;,
 4;26,20,23,27;,
 4;26,27,25,24;,
 4;28,29,30,31;,
 4;32,33,34,35;,
 4;36,37,38,39;,
 4;36,39,40,41;,
 4;33,42,43,44;,
 4;45,46,47,48;,
 4;49,50,51,52;,
 4;53,54,55,56;,
 4;44,43,57,58;,
 4;46,59,60,47;,
 4;61,62,63,64;,
 4;61,64,65,66;,
 4;58,57,67,68;,
 4;59,69,70,60;,
 4;71,72,73,74;,
 4;68,67,75,76;,
 4;69,77,78,70;,
 4;79,80,81,82;,
 4;76,75,83,84;,
 4;77,85,86,78;,
 4;87,88,89,90;,
 4;91,92,93,94;,
 4;95,96,97,98;,
 4;99,100,101,102;,
 4;99,96,95,100;,
 4;103,104,105,106;,
 4;107,108,109,110;,
 4;111,107,110,112;,
 4;113,114,115,116;,
 4;113,116,117,118;,
 4;119,120,121,122;,
 4;116,115,123,124;,
 4;116,124,125,117;,
 4;124,123,126,127;,
 4;124,127,128,125;,
 4;127,126,129,130;,
 4;127,130,131,128;,
 4;132,133,134,135;,
 4;130,129,136,137;,
 4;130,137,138,131;,
 4;139,140,141,142;,
 4;143,144,145,146;,
 4;147,148,149,150;,
 4;151,152,153,154;,
 4;155,156,157,158;,
 4;156,159,160,157;,
 4;159,161,162,160;,
 4;163,164,165,166;,
 4;164,167,168,165;,
 4;167,155,158,168;,
 4;169,170,171,172;,
 4;172,171,173,174;,
 4;174,173,175,176;,
 4;177,178,179,180;,
 4;180,179,181,182;,
 4;182,181,170,169;,
 4;183,184,185,186;,
 4;184,187,188,185;,
 4;187,189,190,188;,
 4;191,192,193,194;,
 4;192,195,196,193;,
 4;195,183,186,196;,
 4;197,198,199,200;,
 4;198,201,202,199;,
 4;201,203,204,202;,
 4;205,206,207,208;,
 4;206,209,210,207;,
 4;209,197,200,210;;
 
 MeshMaterialList {
  7;
  79;
  0,
  5,
  5,
  5,
  5,
  5,
  4,
  4,
  4,
  4,
  4,
  1,
  0,
  4,
  4,
  0,
  5,
  0,
  1,
  0,
  5,
  3,
  3,
  0,
  5,
  1,
  0,
  5,
  4,
  0,
  5,
  1,
  0,
  1,
  1,
  1,
  5,
  4,
  4,
  5,
  5,
  0,
  5,
  5,
  5,
  5,
  5,
  5,
  4,
  5,
  5,
  2,
  0,
  0,
  1,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6;;
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "op1-side.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "op1-side.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "op1-side.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "op1-stair.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "op1-tesuri.png";
   }
  }
  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "op1-shita.png";
   }
  }
  Material {
   0.640000;0.640000;0.640000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.000000;0.000000;0.000000;;
   TextureFilename {
    "pole.png";
   }
  }
 }
 MeshTextureCoords {
  211;
  -2.692712;-2.004179;,
  4.029024;-2.004179;,
  4.029024;-1.028808;,
  -2.692712;-1.028808;,
  3.541057;1.041578;,
  -3.559744;1.041578;,
  -3.559744;1.086404;,
  3.541057;1.086404;,
  3.541057;0.027476;,
  3.541057;-0.018760;,
  -3.559744;-0.018760;,
  -3.559744;0.027476;,
  3.541057;0.074050;,
  -3.559744;0.074050;,
  3.541057;0.999057;,
  -3.559744;0.999057;,
  -5.288640;1.409620;,
  -5.310210;2.384990;,
  -5.356730;2.384990;,
  -5.356730;1.409620;,
  -4.594580;1.409620;,
  -4.533950;1.409620;,
  -4.533950;2.384990;,
  -4.576100;2.384990;,
  -5.288640;2.328890;,
  -5.288640;2.384990;,
  -4.594580;2.328890;,
  -4.594580;2.384990;,
  -1.688470;0.101690;,
  1.599060;0.197000;,
  1.853990;1.033060;,
  -1.433540;0.937750;,
  -3.506330;-2.008571;,
  -3.506330;-1.033199;,
  -3.506342;-1.028974;,
  -3.506342;-2.036842;,
  8.017410;-2.165980;,
  8.017250;-2.211680;,
  8.636470;-2.211680;,
  8.639040;-2.165980;,
  8.943270;3.252730;,
  8.036970;3.252730;,
  -3.504860;2.384995;,
  -3.458338;2.384995;,
  -3.459807;-1.033199;,
  4.400558;-0.019377;,
  4.351412;-0.019377;,
  4.351426;1.084252;,
  4.400571;1.084252;,
  -3.459627;-2.008571;,
  -3.459821;-2.036842;,
  -3.459764;-1.085073;,
  -3.459932;-1.089298;,
  -1.688470;0.101690;,
  -1.448200;0.889670;,
  1.839330;0.984980;,
  1.599060;0.197000;,
  -3.436771;2.384995;,
  -3.416873;-1.033199;,
  4.306056;-0.019377;,
  4.305879;1.084252;,
  -2.017030;-1.358810;,
  -2.016790;-2.006650;,
  -1.003500;-2.006650;,
  -1.003260;-1.358810;,
  -0.974450;4.896560;,
  -1.983370;4.896560;,
  -2.742705;2.384995;,
  -2.762522;-1.033199;,
  3.614803;-0.019377;,
  3.614981;1.084252;,
  -1.448200;0.889670;,
  -1.688470;0.101690;,
  1.599060;0.197000;,
  1.839330;0.984980;,
  -2.724225;2.384995;,
  -2.725694;-1.033199;,
  3.575899;-0.019377;,
  3.575912;1.084252;,
  18.405809;-2.165980;,
  18.968849;-2.165980;,
  18.988400;3.252730;,
  18.181440;3.252730;,
  -2.682079;2.384995;,
  -2.683547;-1.033199;,
  3.531375;-0.019377;,
  3.531388;1.084252;,
  -1.688470;0.101690;,
  -1.433540;0.937750;,
  1.853990;1.033060;,
  1.599060;0.197000;,
  -3.505007;-2.004443;,
  -2.693114;-2.004443;,
  -2.693114;-1.029071;,
  -3.505007;-1.029071;,
  -2.096680;0.589840;,
  -2.132550;0.632310;,
  -1.877620;1.468360;,
  -1.841750;1.425890;,
  -2.132550;0.632310;,
  -2.096680;0.589840;,
  -1.841750;1.425890;,
  -1.877620;1.468360;,
  4.399160;1.027662;,
  3.541482;1.027662;,
  3.541482;1.086404;,
  4.399160;1.086404;,
  -4.594580;1.409620;,
  -4.533950;1.409620;,
  -4.533950;2.384990;,
  -4.576100;2.384990;,
  -4.594580;2.328890;,
  -4.594580;2.384990;,
  -4.413467;1.120602;,
  -4.411915;5.041393;,
  -4.362769;5.041393;,
  -4.364321;1.120602;,
  -4.364335;-0.016609;,
  -4.413480;-0.016609;,
  4.790470;-2.008571;,
  4.790663;-2.036842;,
  4.747547;-1.085073;,
  4.747715;-1.089298;,
  -4.339985;5.041393;,
  -4.318964;1.120602;,
  -4.318787;-0.016609;,
  -3.606780;5.041393;,
  -3.627714;1.120602;,
  -3.627890;-0.016609;,
  -3.587257;5.041393;,
  -3.588809;1.120602;,
  -3.588822;-0.016609;,
  18.405809;-2.165980;,
  18.968849;-2.165980;,
  18.988400;3.252730;,
  18.181440;3.252730;,
  -3.542734;5.041393;,
  -3.544285;1.120602;,
  -3.544298;-0.016609;,
  -0.835056;-4.987128;,
  -1.097355;-4.159966;,
  -4.385235;-4.177758;,
  -4.122936;-5.004921;,
  4.835849;-2.004443;,
  4.023957;-2.004443;,
  4.023957;-1.029071;,
  4.835849;-1.029071;,
  4.023957;-2.004443;,
  4.835849;-2.004443;,
  4.835849;-1.029071;,
  4.023957;-1.029071;,
  -1.489210;1.008480;,
  -1.489210;1.008480;,
  -1.453340;0.966010;,
  -1.453340;0.966010;,
  0.567900;-2.211850;,
  0.869290;-2.211850;,
  0.869290;3.211850;,
  0.567900;3.211850;,
  0.994120;-2.211850;,
  0.994120;3.211850;,
  0.869290;-2.211850;,
  0.869290;3.211850;,
  0.266470;-2.211850;,
  0.141640;-2.211850;,
  0.141640;3.211850;,
  0.266470;3.211850;,
  0.266470;-2.211850;,
  0.266470;3.211850;,
  0.519940;-2.211850;,
  0.519940;3.211850;,
  0.218540;3.211850;,
  0.218540;-2.211850;,
  0.093710;3.211850;,
  0.093710;-2.211850;,
  0.218540;3.211850;,
  0.218540;-2.211850;,
  0.821360;-2.211850;,
  0.821360;3.211850;,
  0.946200;3.211850;,
  0.946200;-2.211850;,
  0.821360;3.211850;,
  0.821360;-2.211850;,
  -1.495650;-1.710330;,
  -1.142120;-1.710330;,
  -1.142120;2.710330;,
  -1.495650;2.710330;,
  -0.995660;-1.710330;,
  -0.995660;2.710330;,
  -1.142120;-1.710330;,
  -1.142120;2.710330;,
  -1.849210;-1.710330;,
  -1.995660;-1.710330;,
  -1.995660;2.710330;,
  -1.849210;2.710330;,
  -1.849210;-1.710330;,
  -1.849210;2.710330;,
  -1.495650;-1.710330;,
  -1.142120;-1.710330;,
  -1.142120;2.710330;,
  -1.495650;2.710330;,
  -0.995660;-1.710330;,
  -0.995660;2.710330;,
  -1.142120;-1.710330;,
  -1.142120;2.710330;,
  -1.849210;-1.710330;,
  -1.995660;-1.710330;,
  -1.995660;2.710330;,
  -1.849210;2.710330;,
  -1.849210;-1.710330;,
  -1.849210;2.710330;;
 }
}
