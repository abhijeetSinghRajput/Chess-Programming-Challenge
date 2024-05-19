let StartingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const StartingHashKey = 0x5300d2e1;

const FileMask = new Array(8);
const RankMask = new Array(8);;
let PawnBitBoard = [0n, 0n, 0n];
const PassedPawnMask = new Array(2);
const IsolatedMask = new Array(120);


const Pieces = {
    empty: 0,
    wp: 1, wr: 2, wn: 3, wb: 4, wq: 5, wk: 6,
    bp: 7, br: 8, bn: 9, bb: 10, bq: 11, bk: 12,
};

const Color = { white: 0, black: 1, both: 2 };
const Squares = {
    a1: 21, b1: 22, c1: 23, d1: 24, e1: 25, f1: 26, g1: 27, h1: 28,
    a2: 31, b2: 32, c2: 33, d2: 34, e2: 35, f2: 36, g2: 37, h2: 38,
    a3: 41, b3: 42, c3: 43, d3: 44, e3: 45, f3: 46, g3: 47, h3: 48,
    a4: 51, b4: 52, c4: 53, d4: 54, e4: 55, f4: 56, g4: 57, h4: 58,
    a5: 61, b5: 62, c5: 63, d5: 64, e5: 65, f5: 66, g5: 67, h5: 68,
    a6: 71, b6: 72, c6: 73, d6: 74, e6: 75, f6: 76, g6: 77, h6: 78,
    a7: 81, b7: 82, c7: 83, d7: 84, e7: 85, f7: 86, g7: 87, h7: 88,
    a8: 91, b8: 92, c8: 93, d8: 94, e8: 95, f8: 96, g8: 97, h8: 98,
    noSq: -1,
    offBoard: -2,
}

const SquaresChar = {
    '21': 'a1', '22': 'b1', '23': 'c1', '24': 'd1', '25': 'e1', '26': 'f1', '27': 'g1', '28': 'h1',
    '31': 'a2', '32': 'b2', '33': 'c2', '34': 'd2', '35': 'e2', '36': 'f2', '37': 'g2', '38': 'h2',
    '41': 'a3', '42': 'b3', '43': 'c3', '44': 'd3', '45': 'e3', '46': 'f3', '47': 'g3', '48': 'h3',
    '51': 'a4', '52': 'b4', '53': 'c4', '54': 'd4', '55': 'e4', '56': 'f4', '57': 'g4', '58': 'h4',
    '61': 'a5', '62': 'b5', '63': 'c5', '64': 'd5', '65': 'e5', '66': 'f5', '67': 'g5', '68': 'h5',
    '71': 'a6', '72': 'b6', '73': 'c6', '74': 'd6', '75': 'e6', '76': 'f6', '77': 'g6', '78': 'h6',
    '81': 'a7', '82': 'b7', '83': 'c7', '84': 'd7', '85': 'e7', '86': 'f7', '87': 'g7', '88': 'h7',
    '91': 'a8', '92': 'b8', '93': 'c8', '94': 'd8', '95': 'e8', '96': 'f8', '97': 'g8', '98': 'h8',
}

const FileChar = 'abcdefgh';

const FileA = Rank1 = 0;
const FileB = Rank2 = 1;
const FileC = Rank3 = 2;
const FileD = Rank4 = 3;
const FileE = Rank5 = 4;
const FileF = Rank6 = 5;
const FileG = Rank7 = 6;
const FileH = Rank8 = 7;

const Sq120To64 = new Array(120);
const Sq64To120 = new Array(64);
var Mirror64 = [
    56	,	57	,	58	,	59	,	60	,	61	,	62	,	63	,
    48	,	49	,	50	,	51	,	52	,	53	,	54	,	55	,
    40	,	41	,	42	,	43	,	44	,	45	,	46	,	47	,
    32	,	33	,	34	,	35	,	36	,	37	,	38	,	39	,
    24	,	25	,	26	,	27	,	28	,	29	,	30	,	31	,
    16	,	17	,	18	,	19	,	20	,	21	,	22	,	23	,
    8	,	9	,	10	,	11	,	12	,	13	,	14	,	15	,
    0	,	1	,	2	,	3	,	4	,	5	,	6	,	7
];

const PieceChar = '.PRNBQKprnbqk';
const PieceType = '.prnbqkprnbqk';
const PieceName = ['.', 'wp', 'wr', 'wn', 'wb', 'wq', 'wk', 'bp', 'br', 'bn', 'bb', 'bq', 'bk']
const PieceColor = [
    2,
    0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1,
];
const PieceValue = [
    0,
    100, 550, 325, 325, 1000, 50000,
    100, 550, 325, 325, 1000, 50000,
];
const SideChar = 'wb.'
const Kings = [Pieces.wk, Pieces.bk];

const RookDirectins = [-10, 1, 10, -1];
const KnightDirections = [19, 21, 12, 8, -19, -21, -12, -8];
const BishopDirections = [-9, -11, 9, 11];
const KingDirections = [...RookDirectins, ...BishopDirections];
const QueenDirections = KingDirections;

const PieceDirections = [
    0,
    0, RookDirectins, KnightDirections, BishopDirections, QueenDirections, KingDirections,
    0, RookDirectins, KnightDirections, BishopDirections, QueenDirections, KingDirections,
];

const SlidingPieces = [
    [Pieces.wr, Pieces.wb, Pieces.wq],
    [Pieces.br, Pieces.bb, Pieces.bq],
];
const NonSlidingPieces = [
    [Pieces.wn, Pieces.wk],
    [Pieces.bn, Pieces.bk],
]


const PieceKeys = [
    [
        0x5b1ecd20, 0x7ed83b59, 0x7a0e679e, 0xbf1323b, 0x10625894, 0x65c92c15, 0x142dd5d9, 0x4b929997, 0x730cd6aa, 0x23c44eae,
        0x7288f23d, 0x2a5943c1, 0x6b1ca129, 0x1ba6c98, 0x50c085a9, 0x4b33da6d, 0x6e91b0bc, 0x2cd2e761, 0x473a249c, 0x7692dee0,
        0x4d826ef5, 0x172f99b1, 0x29fc7565, 0x627f93fc, 0x79a49257, 0x5b01094, 0x26ea13db, 0x6f11dbb4, 0x79c47588, 0x1df93d8e,
        0x6de14d40, 0x34b466d8, 0x1a9ba3f3, 0x40d8762c, 0x1f09fe0c, 0x5ea0f1c, 0x4484b84a, 0x5358488d, 0x61cc9dda, 0xa3a201,
        0x23f6560c, 0x31e9e85e, 0x2047963e, 0x469bc08d, 0x78eb35be, 0x1888f60d, 0x3ad85904, 0x66b9a994, 0x31a81865, 0x59ba0aee,
        0x764b4a3b, 0x78743c2a, 0x5f9547a6, 0xa563efc, 0x2ff2fcf6, 0x5846c84, 0x3d935b41, 0x30bfc48d, 0x249103b4, 0xfab712b,
        0x5af01880, 0x60baec87, 0x33700a56, 0x2d89296d, 0x4ddfa2a, 0x6e0a696, 0xfbe8000, 0x35e7d77d, 0x75852c33, 0x5cea8a36,
        0x64539c16, 0x7a9f80ba, 0x5fe2c643, 0x2123657b, 0x629b51fd, 0x2feed70d, 0x7dbf5329, 0xcee1544, 0x52bd40bf, 0x53f82e95,
        0xd7417de, 0x60f81a0c, 0x559f3776, 0x65340b4e, 0x743d89, 0x58454289, 0x3afbef58, 0x71204ddf, 0x1d7055d9, 0x10c123d1,
        0x2ed18993, 0x7cb651e3, 0x1c625667, 0x608eedb0, 0x1d40f789, 0x77d12fe8, 0x7d91f1f7, 0x27e98da6, 0x181cbe44, 0x6f7dc2f,
        0x4489af53, 0x6ba301c7, 0x13b4619e, 0x741a2f6d, 0x53a4f239, 0xe89e5e8, 0x6b92a76f, 0x65e4483f, 0x4999d06, 0x74e7260f,
        0x29167e3c, 0x3eec2d8d, 0x236b7388, 0x1fbb401d, 0x55cdcf9f, 0x7dc4e3c8, 0x3397cc5d, 0x767561cd, 0x24957841, 0x4fee9317,
    ],
    [
        0x2be5d589, 0x7d965169, 0x5398c310, 0x15d4dd41, 0x7bd974b0, 0x60d3fa3a, 0x3e82a336, 0x78a1ded6, 0x6735c287, 0x19ac0e28,
        0x5f0946d, 0x638226fd, 0x24f4d70c, 0x38dcf5d5, 0x40bb98d8, 0x78176eca, 0x16cf7f39, 0x43f66022, 0x499b71ed, 0x34de008e,
        0x7fa605b7, 0x209637a2, 0x3ed9ca6, 0x798c7b24, 0x6fbc5e69, 0x16c83c7b, 0x2ac6c24, 0x2582a9d7, 0x5e814041, 0x59c14bd9,
        0x1b6eb630, 0x1837db42, 0x51d87804, 0x3d9edc63, 0x7cf58375, 0x3296e4f9, 0x4cf7869c, 0x69eae335, 0x46a15abe, 0x26cf7e73,
        0x5c3fed, 0x588b87c5, 0x789f4346, 0x317aa21f, 0x2ba8467c, 0x1ebba18f, 0x60cfb58c, 0x4ab3c187, 0x40ac4c9f, 0x75052d83,
        0x6f64e925, 0x6169e517, 0x5ac22714, 0x4fc6f259, 0x150c40b5, 0x3a0c3f98, 0x5b667a70, 0x3f8137c5, 0x6a782f6d, 0x3c715d3c,
        0x69e39327, 0x62a97589, 0x5bcf03fd, 0x6081bb00, 0x73b2e9f6, 0xd3cc303, 0x321e80b5, 0x23f11fdf, 0x5380b72e, 0x303a8a3f,
        0x338a11c4, 0x3b29a49c, 0x141b2036, 0x66753814, 0x6e4afac5, 0x56bcb962, 0x4ad5ba84, 0x4dfab17a, 0x20827107, 0x13d5fe68,
        0x3f513969, 0x24fcc41, 0x1f7d8634, 0x1b0b812d, 0x3eb510f8, 0x5daaee36, 0x20870ef8, 0x2d5ce823, 0x60e9b571, 0x27fe1cda,
        0x5e075972, 0x79dcb886, 0x3959a8c2, 0xd88120e, 0x61ed3dfb, 0x5dbecfee, 0x6a965a79, 0x59e80d76, 0x53d9dd37, 0x47d4accf,
        0x2e531ef4, 0x64aefb89, 0x758e3986, 0x7291cb6e, 0x11bfeb1d, 0xcfda368, 0x22c40fc7, 0x12a5122f, 0x16f08ac0, 0x26d0cc9b,
        0x61c600dd, 0x4b9522fe, 0x66f60dcf, 0x76e25182, 0x39ea85f0, 0x5112fe82, 0x26408cc6, 0x25b9d28c, 0x2117ba1, 0x2efa3a9f,
    ],
    [
        0x6d900e5d, 0x1ed243bb, 0x2e9c3fcc, 0x52443a66, 0x45f382c2, 0x4c8da845, 0x528e8cee, 0x18e4a829, 0x5f91a7c2, 0x1ed86ba6,
        0xefcac8d, 0x4dd81f01, 0x217c420a, 0x73745aa5, 0x7de3f285, 0x7aad5212, 0x28cbb63b, 0x3ef8da16, 0x567c3db5, 0x78d89931,
        0xbf9b96b, 0x50b4951f, 0x5e25808f, 0x74c38003, 0x6de4ea07, 0x396285c, 0x20882cee, 0x2693931c, 0x6b8a8b17, 0x23d0aec3,
        0x1f24407a, 0x50670bef, 0x15675978, 0x31c0c5a2, 0x1ce62565, 0x3a9c49e5, 0x70482ffb, 0x428afa62, 0x7c8bf41b, 0x7ae0667b,
        0x449779bc, 0x6ba232b4, 0x43aecc70, 0x2f04176, 0x34f76771, 0x4abeda85, 0x543f9962, 0x9a755a5, 0x16989b2d, 0x52d71d3f,
        0x628563e9, 0x68e4bffb, 0x35ec3306, 0x392b99e6, 0x17f74d72, 0x18fa7698, 0x4dca888e, 0x77b9b9e8, 0x45f388e2, 0xdfe6c9e,
        0x5bfe5562, 0x7f6eba81, 0x6d50094c, 0x7a4b18f8, 0x1dbde523, 0x62ba73bf, 0x48ae6303, 0x5028fb6, 0x52b77027, 0x4f8bd24a,
        0x2d9c5d1d, 0x657c36e0, 0x335a3909, 0x63cdf555, 0x2aab1f3b, 0x641cafab, 0x25013dfb, 0x31cae5a6, 0x1aa02a17, 0x49e28610,
        0x318efaf5, 0x6a0b31a7, 0x432dc7ad, 0x634b0af3, 0xe2cf69b, 0x25be3206, 0x3078acea, 0x5d849e11, 0x62d3de86, 0x2d2f258,
        0x1bc08ce5, 0x2ba62074, 0x64d97aaf, 0x4a34dab1, 0x40b74bf8, 0x32fdcf9b, 0x7dc7866d, 0x21ae2bd1, 0xd4a6184, 0x751f1d07,
        0x3870bb33, 0x7b44fd14, 0x2bd46948, 0x5d9c8174, 0x13d76b14, 0x6c0d956e, 0x74f977a8, 0x78e709e6, 0x448a7ac9, 0x31989c9d,
        0x4481e671, 0x5bfad8d1, 0x2c64eb34, 0x3ec92d3f, 0x4386db04, 0x12177357, 0xd6bda8, 0x79860b62, 0x1cbea43e, 0x21e01a0b,
    ],
    [
        0x55825584, 0x70b25ce6, 0x4ee3afda, 0x61e2d04b, 0x58d36c9f, 0x7d0e6d0, 0x145ebc6b, 0x24ca8151, 0x53ac85c2, 0x1f8e2989,
        0x5f587934, 0x56e89e13, 0x3893efbc, 0x75a47108, 0x5e8d215, 0x13064d96, 0x26ab8416, 0x78dad039, 0x30d756f3, 0x559df23e,
        0x4dfb96fc, 0xbaa199e, 0x47de4343, 0x238e9224, 0x1fe0deb0, 0x5d79bab6, 0x18de6437, 0x7b1ad033, 0x742bd9b6, 0x2f307450,
        0x5f9efe18, 0xc844fbc, 0x7f78e42e, 0x4459bab2, 0x31fc83f2, 0x74940651, 0x3c9c5b8d, 0x4d8d49c9, 0x2bb21d28, 0x2cd72cd8,
        0x5ef3e894, 0x2dfdcae6, 0x7386549d, 0x218b01f8, 0x102da6a3, 0x7ac3d2e6, 0xda14321, 0x5ef6d4cc, 0x6be6f829, 0x13a9070e,
        0x7bb995b4, 0x496f8c4f, 0x5ad145ab, 0x3af867d5, 0x52f8ae69, 0x6f6b1688, 0x4eb24f24, 0x2ad5188e, 0x76b2649e, 0x3ad7f567,
        0x6db6d33a, 0x88da637, 0x31293c3e, 0x56cffa58, 0x2cf07bda, 0x266a3d4b, 0x288f7669, 0x52185ade, 0x681d355, 0x426882a,
        0x5d9caa30, 0x4e591a3, 0x21be28f9, 0x7ea90b33, 0x10b8b4df, 0x6885b22a, 0x77a19a98, 0x17a20411, 0x7ad19003, 0x5305003,
        0x29bf608a, 0x5b3a12c8, 0x6115bcd1, 0x59e6b5bc, 0x5dd86ae5, 0x7eb97f78, 0x17eaadb2, 0x593f9a97, 0x71d36576, 0x78eb9c50,
        0x53a55718, 0x3c854b4b, 0x3ebbf9c5, 0x1ca3ee83, 0x15f9d277, 0x21955d36, 0x21edea21, 0x128772f2, 0x6f945433, 0x15baf509,
        0x38c4d01a, 0xc9636a9, 0x20803262, 0x5ede944b, 0xdcc4e1, 0x3900d20, 0x2f1754e8, 0x1f378eee, 0x48ab8543, 0x189e2ca9,
        0x12f24560, 0x878a65, 0x3c387f81, 0x30fbee5, 0x71453c60, 0x4376ea3e, 0x3993d7d1, 0x1f5f9289, 0x5c2713aa, 0x5696a714,
    ],
    [
        0x1ea9310f, 0x53efe576, 0x268215a3, 0x6f2440aa, 0x7c9eb4a7, 0x62e58f54, 0x44c7cb21, 0x43a9e24b, 0x2aecc4b7, 0x10f14e9a,
        0x1b1fb6cb, 0x4cb95a11, 0x35265a9f, 0x45213563, 0x63e30fe, 0x3a8005dc, 0x43c477f2, 0x42a44769, 0x31e6d29c, 0x31f611ac,
        0x6ec9cd73, 0x4ccd693b, 0x31f2a5a8, 0x6a75d1e2, 0x7bf3c3e9, 0x2b84d6f9, 0x5fcb131a, 0x6ef9948e, 0xefb93f2, 0x33eed695,
        0x67977fb4, 0x62f2571c, 0xe813520, 0x5dd1feae, 0x60cbaa00, 0x78c276a2, 0x71a8edc8, 0x3daac9cd, 0x47ad36ad, 0x49cc47aa,
        0x972cd21, 0x7ef21f13, 0x61c41fba, 0x53b475c0, 0x15c1d89d, 0x2a6466e4, 0x66d72cd9, 0x76ede51d, 0x78be8c87, 0x55e6324d,
        0x51d8fee1, 0x3ad4d1be, 0x41d830ed, 0x75cba8d4, 0x74ba20a9, 0x6a670ef6, 0x177de56c, 0x59caaa6d, 0x14a43089, 0x6fc2df1c,
        0x3aa3cb97, 0x34321c39, 0x59a22b90, 0x41ad6bd3, 0x239efbc2, 0x15f95e42, 0x36a0078a, 0x4995300e, 0x3bbdc481, 0x49e97be9,
        0x199ce329, 0x35a75e34, 0x17602eb1, 0x406cce7, 0x6bce75e2, 0x6de261a6, 0x3bdef22f, 0x2391fa4, 0x716a3e87, 0x3e91e859,
        0x1f1baffe, 0x68e35793, 0x7a688a3, 0x55199eca, 0xbf09d55, 0x3d4b4f4b, 0x67d31dcc, 0x2ecebd44, 0x66ddfcec, 0x2bf849d5,
        0x70ce4936, 0x699985a9, 0x7ee7088e, 0x20aafb56, 0x4748cc24, 0x31c797a0, 0x71bb5343, 0x6c566025, 0x6be833a5, 0x2d59d91,
        0x133cbf0b, 0x5a803517, 0x5298aa17, 0xef2e022, 0x5eee7780, 0x6124537a, 0x6f6274c4, 0x7b991689, 0x24cbb51c, 0x38a45814,
        0x4392687a, 0x41af1174, 0x34358630, 0x4b70db0a, 0x7d366d9, 0x673dd660, 0x1ff17a39, 0x10c84700, 0x1e6ad88b, 0x5b9da82,
    ],
    [
        0x7ae217c, 0x60ebf174, 0x10edd21b, 0x5c7a50d9, 0x5dfbb87c, 0x41c4e301, 0x58cc0424, 0x7ebd756, 0xef0a34e, 0x2c2ecd01,
        0x6ce4e16f, 0x5b8564d6, 0x2fe16777, 0x5ec197d, 0x20ef8f71, 0x48a8499a, 0x1baf9f13, 0x2d1aa37f, 0x99e464d, 0x13f27d1c,
        0x3b9829f4, 0x4a32cd8f, 0xb3e3e3b, 0x2b8e4238, 0x759e0d69, 0x28e59c6d, 0x78a6ec12, 0x29ed9a1f, 0x4cadad43, 0x5c62fa2,
        0x1a705527, 0x51ae0bf0, 0x4d444537, 0x7559d7eb, 0x148bb7eb, 0x4890d498, 0x79c7ec5c, 0x32b3d012, 0x3387e0bd, 0x2f30f0,
        0x544e0b94, 0x5bf5dd74, 0x33beae4d, 0x54806af5, 0x2810fbb9, 0x38af3fc9, 0x57be35c4, 0x9902062, 0x885aaba, 0x29e7aa5b,
        0x57e7b249, 0x7fe9a12, 0x14819901, 0x45aa0323, 0x1f976290, 0x7537ef46, 0x5bd17b52, 0x6ea5daaa, 0xeb9b48e, 0x629f21f6,
        0x16bc309c, 0xce7b2c9, 0x13bc0fdb, 0x768f4541, 0x1790385b, 0x468d38f3, 0x4f899810, 0x4d4c3e73, 0x7dd2aa27, 0x111a5687,
        0x4a1ce3e8, 0x5cb811b8, 0x2e525319, 0xed9ed2f, 0x1676c667, 0x6c949590, 0x5fe2849c, 0x1fb2f5a8, 0x2a25d23, 0x71c133b8,
        0x4fa2f369, 0x766c6782, 0x119d9d09, 0x3d80ad68, 0x3ff465bf, 0x526fba85, 0x47322034, 0x6ad8ebb5, 0x7f7d77b4, 0x29cb2dc7,
        0x3633b806, 0x4f9ebf52, 0x3f80195d, 0x2eb42652, 0x31f4caa2, 0x6706b0d0, 0x44e07237, 0x2cd83e89, 0x48587bb, 0x1dd94c3,
        0x5aea4bc9, 0x5155ec00, 0x1a91c6a0, 0x1d9516df, 0x62b9df52, 0x52c83151, 0x248a93b7, 0x3fdccb30, 0x1bd3300b, 0x334b119,
        0x3dda3de1, 0x738f2edd, 0x684a07e4, 0x79e37e84, 0x30571392, 0x60e48690, 0x7cf2f65c, 0x73e42169, 0x1bca4845, 0x3b809930,
    ],
    [
        0x64908e15, 0xe852791, 0x52a66cb3, 0x81ffb49, 0x16808770, 0x51e6f0fe, 0x73b45b20, 0x38da63ab, 0x609e3404, 0x25ef26d9,
        0x450620ca, 0x78cb0a6a, 0x2a6cf187, 0x1f37d9a, 0x5bac54d2, 0x1fe3ed90, 0x16e71280, 0x11ca1ef4, 0x5d5014a0, 0x7e0ae5b6,
        0x139fe102, 0x33f15b10, 0x6fed9523, 0x350a16d3, 0x17cb6aa2, 0x70b18645, 0x3ecd72ca, 0x6a882003, 0x16b121d8, 0x4fa16e2,
        0x7bb9dc3b, 0x185bb846, 0x459ace33, 0x318dd142, 0x17112503, 0x69c35dc9, 0x43ce6eef, 0x78a0cdbf, 0x563dee65, 0x60b0bd5a,
        0x1bdd5ccf, 0x500d7e14, 0x5f887d4c, 0x46c1fb15, 0x29a0e382, 0x4622de6d, 0x66bce877, 0x5589b6f5, 0x4cfe1275, 0x2674e844,
        0x16e361f, 0x3192c869, 0x7d120e50, 0x5feb27bf, 0x502c0b2a, 0x4ed5b81b, 0x903313e, 0x30058044, 0x6af2ccf2, 0x42349b1b,
        0xccf8514, 0x1af7afc1, 0x16c59bf4, 0x1fcd1164, 0x3b44f596, 0x58b9dff1, 0x5785d650, 0x10baa8d3, 0x3852f344, 0x50f155f6,
        0x7ce8ebaf, 0x39b2fe71, 0x20a8fa72, 0x111d48ad, 0x55232710, 0x35ed915c, 0x6110a15a, 0x5c43ee12, 0x68fc1e16, 0x656de62c,
        0x3ea8962c, 0x64d8049e, 0x30b99bc9, 0x461689e0, 0xdf81de6, 0x4628a8a8, 0x313742d7, 0x49789ebf, 0x12aad506, 0x61819e11,
        0x38f03738, 0x71952feb, 0x3f22e09d, 0x4a19fe01, 0x5b0fe548, 0xfeb012d, 0x55e1118f, 0x777604a6, 0x4abbbae4, 0x291069a0,
        0x73cda6cd, 0x4ff64add, 0x4b959954, 0x5b84c6d8, 0x27f7dcbb, 0x26d6e479, 0x6615f0c2, 0x72fec39c, 0x72a605ae, 0x7a971cb8,
        0x1aa8d558, 0x429c317c, 0x15e8c988, 0x7be7c6be, 0x1aac774c, 0x679d8a05, 0x7f5e04ef, 0x2fbe9a7e, 0x54c5da0f, 0x25fb13ab,
    ],
    [
        0x3d86d11f, 0x7c8e8ec2, 0x56defe7a, 0x58bc08fe, 0x664604df, 0x44f75bba, 0x68fff3b8, 0x6698474b, 0x26705a63, 0x12d7b653,
        0x722f01f9, 0x72b633b8, 0x101c8f38, 0x58a30f66, 0x7df6bb51, 0x467f8544, 0x5807bdef, 0x28fa1611, 0x268f09f0, 0x5fa27b7f,
        0xe9de1fb, 0x7688fbba, 0x1a17c642, 0x5215263f, 0x58b31169, 0x65c7c43e, 0x4c665623, 0x6fe31412, 0x2073ddc7, 0x2dcc0c95,
        0x20b72f67, 0x37b4aec3, 0x2d997f40, 0x645072e0, 0x1ce3c311, 0x254a4c9a, 0x7dc04e0d, 0x427df820, 0x4c8385c4, 0x5890500d,
        0x178af56b, 0x2a3c44fa, 0x600d2fb6, 0x5ac0dac2, 0x22a039dd, 0x6f633ca5, 0x772592cf, 0x4ef65156, 0x79fc8cdc, 0x47782508,
        0x2ab734ec, 0x18e846d5, 0x4cb65ff1, 0x2d5f54e2, 0x26900139, 0x2831b6dc, 0xcd6e113, 0x4aec3e7a, 0x98682f0, 0x17dcd21b,
        0x689dbb73, 0x3bf764ba, 0xd9fbeb8, 0x54ed69c1, 0x71cf407c, 0x24b8e1d0, 0x51472e14, 0x6fedd23b, 0x62f43fe0, 0x29df35a7,
        0x65d70f03, 0x6fb47a4c, 0x458d7feb, 0xfbc8a80, 0x3bd5a48b, 0x3ad1e278, 0x6ebb997f, 0x31df84e9, 0x4f81b63d, 0x5d8b55d0,
        0x35b209b5, 0x481f6a82, 0x7d57a497, 0x49fb18e4, 0x5fff9295, 0x420f92f6, 0x2af9f58b, 0x70da049d, 0x242a75aa, 0x6e54e5dc,
        0x6d96e700, 0x10cc4f36, 0x2c9a8a13, 0x5eac63b2, 0x12a6ea96, 0xea5fc1, 0x64a51b1b, 0x4ecfa8fa, 0x55d36b29, 0x3bd5cbdc,
        0x38d62846, 0x73994a2e, 0x50aa359a, 0x73c33555, 0x5b728e6a, 0x1f287c04, 0x7ee79e9, 0x1b6c7f7c, 0x2f2955b0, 0x1580ac79,
        0x187a0041, 0x64f4ccd6, 0x547097ce, 0x3d4ba143, 0x20d83ccb, 0x76872ee4, 0x6bfcb7a5, 0x563f1e4e, 0x2ce209e7, 0x79e12b5c,
    ],
    [
        0x14b1f84f, 0x41add185, 0x1b8f62dd, 0x63912e7b, 0x33f3e3a5, 0x32c9f376, 0x2adbbbec, 0x6de324f8, 0x3c4e0c77, 0x478607f0,
        0x4d9971b9, 0x52e211fc, 0x3ce385d6, 0x37d80c00, 0x6554bc30, 0x4538586a, 0x1c6d8113, 0x1255c396, 0x184bec8, 0x1f885206,
        0x2356d977, 0x6f78cbc, 0x61a60319, 0x64753115, 0x7dd27879, 0x69fc77d0, 0xcc6fb43, 0x6ef5a139, 0x6dbbbdf0, 0x589b6da0,
        0x56bcdbc, 0x2a96dd4d, 0xf100133, 0x15e41d2e, 0x2a89258e, 0x79b2c337, 0x376d13f9, 0x79afe5d1, 0x7badd8ad, 0x539c9594,
        0x14eeb502, 0x6eaee823, 0x54edd009, 0x68e164cc, 0x49090604, 0x39846ad5, 0x3486baa9, 0x412bf6cd, 0x76c29f51, 0x69b9eb71,
        0x5e3ffce2, 0x312a2c0e, 0x4ebdf85f, 0xccb3f46, 0x45b8a4dd, 0x43b2c970, 0x6a80d2e, 0x2d55bdaa, 0x277a4088, 0x20eef5ee,
        0x63bb2e74, 0x51c8ab48, 0x608afa46, 0x5ee56b7c, 0x434b5f82, 0x51a2d5c5, 0x6de4e299, 0x4f9dddef, 0x42c9006f, 0x69a2a8dd,
        0x5ac73430, 0x558c97cf, 0x62eccd6b, 0x6b669d6, 0x33afaead, 0x4afd2d47, 0x37877158, 0x5889aa26, 0x459187ea, 0x7682d20c,
        0x1125feb0, 0x3f0efe3, 0x6dd465f1, 0x35ebf0e8, 0x640bd35c, 0xa977718, 0x12392574, 0x15ec7aa8, 0xf2cd767, 0x34b63e0f,
        0x519ce5d0, 0x5bee3259, 0x6aaadca0, 0x47d7e31b, 0xcdcd72a, 0x6fb96273, 0x4ecfef87, 0x44a12b0f, 0x2f848481, 0x6eebfd15,
        0x2dc79b18, 0x3b80e664, 0x54ba0a51, 0x65fe27d5, 0x17ca049a, 0x54c5d2aa, 0xccb5da3, 0x5097db02, 0x23c99c90, 0x42a5a224,
        0x8edacd, 0x6f08fb6, 0x1a123eeb, 0x1ca67da3, 0x77be4ae0, 0x2e91fe41, 0x4c82741, 0x6988c454, 0x14df7f62, 0x68856ecd,
    ],
    [
        0x3c842e42, 0x54cde5d9, 0x2ab72123, 0x5d36ddcf, 0x4d259e48, 0x36829dee, 0x28804ccf, 0x51f38c8, 0x5e05d99, 0x67b7fd55,
        0x24a9f878, 0x75e3d050, 0x15a3cd98, 0xac54a22, 0x4b5f7708, 0x26f0d02d, 0x26e301c6, 0x40947f2a, 0x4be1ab80, 0x8811ec8,
        0x32b85553, 0xdd838c4, 0x5ca5d8e4, 0x4f85a44, 0x12866752, 0x13cb81f8, 0x4dae99ca, 0x1ab78f15, 0x248c819f, 0x4c10e173,
        0x5dde35be, 0x7aa4227a, 0x23f4fb0f, 0x6e927053, 0x59ecf6a2, 0x3fa55b0e, 0x4640fd7e, 0x2dfc87a3, 0x419fc115, 0x663a2be8,
        0x6ad06f9c, 0x7d158462, 0x5fcd8bd5, 0x5cddfaca, 0x4d92f37f, 0x3a02fb4, 0x2d5d626a, 0x14d01189, 0x20c9fc8e, 0x54a1867b,
        0x3aea404a, 0x7f8acf6d, 0x7aaee497, 0x7c9efec4, 0x462e6dd7, 0x4727170c, 0x3c0511c7, 0x2bf9b950, 0x7d33379, 0x41ddd951,
        0x4d497c2b, 0x73cdc4eb, 0x6c22c4, 0x32dfe2ed, 0x3b98d461, 0x1999b747, 0x2192a398, 0x45bedf04, 0x15d10d94, 0x3e4134dc,
        0x74b61b18, 0x25f2fe3a, 0x2616555e, 0x876d40f, 0x46c3636b, 0x50ccbab5, 0x26f2f4c8, 0x4efe36e3, 0x6bdfd4da, 0x5bf25fb3,
        0x19303ccb, 0x46ae6bf1, 0x1a4c36c, 0x56f5d3a8, 0x5f3098ad, 0x49d5787b, 0x1eeaab0e, 0x60027655, 0x4e41bbf3, 0x2d164c00,
        0x669f015a, 0x55c9f3e8, 0x3b86c9de, 0x2a8d90c5, 0x29e38f31, 0xd6819eb, 0x5cc06dd9, 0x499fa91f, 0x3bedaee3, 0x49ab9e69,
        0x49a33db0, 0x5fe13bd3, 0x1ab06ae, 0x503c7fab, 0x7be5eb5b, 0x6ccb54ad, 0xb78444e, 0x66cc7ba0, 0x1bb18daa, 0x1683bd71,
        0x2bac0a2e, 0x19b5d4b1, 0x59a0e1d1, 0x77d65ad8, 0x31f9da82, 0x3d8f8570, 0x46e90088, 0x298f3144, 0x208b6ba8, 0x5bc7b7d8,
    ],
    [
        0x5d2add8, 0x1c5f15bd, 0x2896775e, 0x1c059ba5, 0x42b7fe78, 0x9d47336, 0x872a201, 0x48c5fbb5, 0x27d09f82, 0x39a20eee,
        0x7fa9495e, 0x77fb1661, 0x79f9c5fe, 0x22fa1a3d, 0x36da8017, 0x49fb2344, 0x20bf7b1a, 0x782224e1, 0x20fc8fa, 0x37b3355b,
        0x246086a5, 0x4ba086f, 0x55ea6c21, 0x44bde456, 0x36a52ddb, 0x6352248e, 0x429db965, 0x4f88edf1, 0x3acde1df, 0x1cc9aadc,
        0x3ae010c4, 0x56a00e52, 0x32ca9c63, 0x6f475e3b, 0x7a984a85, 0x718328cf, 0x4fba7de4, 0x5283d77f, 0x757822c1, 0x2dcc88e8,
        0x179cc220, 0x7196a8bc, 0x69c554bc, 0x36b1ed93, 0x7bdf0322, 0x4f71cc42, 0x664b9997, 0x10a1e7eb, 0x16de753e, 0xb88b5a6,
        0x46f64143, 0x5a3749cf, 0x95f1a86, 0x58164f3a, 0x79b7d448, 0xce5dbad, 0x7b5ac23e, 0x12e2d146, 0x40f82ca7, 0x7692ebf9,
        0x4aad7fa4, 0x258a6d78, 0x1082ce06, 0x2e14960a, 0x5af5ae64, 0x6b6b32c4, 0x3d6008b, 0xa671a4b, 0x1899b28f, 0x1c94fc50,
        0x3bc355da, 0x64b97066, 0x301abf54, 0x7e47a287, 0x57e3d71b, 0x3b9e5ad1, 0x5af2cf56, 0x6bf40962, 0x366481ad, 0x40a4d351,
        0x69a2767, 0x2eb491d8, 0x5ac9fa0d, 0x689b11f, 0x72fe4d42, 0x1c834a09, 0x3fe864d3, 0x7be41b49, 0x3b565a36, 0x1fa079c,
        0x58b88b0e, 0x31b73950, 0x7ef2a11b, 0x6c813873, 0x4ee643df, 0x6893399d, 0x3689c197, 0x3e977e13, 0x11ba5994, 0x1fecea5,
        0x4a9ccb0b, 0x4de6ec20, 0x3ad15216, 0x7a92cd84, 0x1281709c, 0x4527b237, 0x7290bf1e, 0x429b2d6f, 0x25b98597, 0xca0fe2a,
        0x35e68a7d, 0xf9833e5, 0x29b726fb, 0x5c64a178, 0x2eed32f, 0x181106a7, 0x62bf72de, 0x6ab770a9, 0x60ed9cfe, 0x269b956c,
    ],
    [
        0xad5af77, 0x53a4e85a, 0x2efc8cce, 0x7682c6b, 0x1a73f7de, 0x40ea313a, 0x515ef778, 0x17e421e1, 0x22e4e0c9, 0x6b10ab55,
        0xfb04cc6, 0x4a51e013, 0x49da8201, 0x568fb09b, 0x5b39c192, 0x57d23303, 0x56ec73cd, 0x3aa0310b, 0x274db855, 0x6fd7f3c0,
        0x1bce49ee, 0x5908325e, 0x1e6ab5c7, 0xd6061fc, 0x42dccdb1, 0xb959e0b, 0x41edc70a, 0x5396f0b2, 0x4e2c16cf, 0x428e6d00,
        0x11b154f1, 0x68fde79e, 0x388bc7bb, 0x7780fa12, 0x61b3c343, 0x4eb8eea3, 0x51d0a9c5, 0x61093a09, 0x7838ead9, 0x5de7bf2e,
        0x2fcdde3a, 0x1731a15d, 0x11527b7a, 0x592da2c, 0xeba5ff6, 0x16d05fc6, 0x3fb5d111, 0x4b4c66a5, 0x423060be, 0x162e75fd,
        0x8f2de47, 0x605f8384, 0x5ec5cc1a, 0x2fd8fcda, 0x775a2d28, 0x39e70252, 0x4fd8965a, 0x248dd340, 0x18ba3bde, 0x6bcd490,
        0x66507779, 0x71a0aa0, 0x20f20680, 0x2c40f1a2, 0x15fa5265, 0x1ced5d01, 0x76ef88ea, 0xcdae978, 0x37f9b532, 0x66f5011f,
        0x19c949b1, 0x72be684a, 0x4ee99753, 0x61d44b66, 0x7af09186, 0x36c7d01b, 0x309883f6, 0x7163accc, 0x69a6ef57, 0x45adba5c,
        0xe17e9af, 0x44a5cbf5, 0x589e1c9b, 0x653e2bad, 0x20a97be5, 0x78ffcd42, 0x1f314fa9, 0x7af1b665, 0x3ccf11af, 0x5aab3e6d,
        0x60b0ec61, 0x2c6689b0, 0x64bfb85d, 0x3e3189fb, 0x12ed4e9c, 0x7c245235, 0x58d60af4, 0x5ab122c6, 0x7dbaf940, 0x73831986,
        0x56e03293, 0x7cf8c5ef, 0x35c30852, 0x2ccf058b, 0x18853d90, 0x1bb8e5bf, 0x77ddb70c, 0x4e6a49a3, 0x703ce95e, 0x3fe475c9,
        0x40a66a6c, 0xc6e7cc0, 0x525c5dd4, 0x3d4a1630, 0x712f45d9, 0x698f0e6f, 0x3936c864, 0x4fbc2f2b, 0x61a7d23e, 0x4dfda1bb,
    ],
    [
        0x18f9b0bf, 0x2ec0ef3b, 0x6dcc39c2, 0x741ad5ec, 0x6580babf, 0x8a930fa, 0x6fb470a, 0x4dbc767f, 0x72f79487, 0x10e34c87,
        0x7cdedca2, 0x61ca5ce6, 0x3f3be6c1, 0x573732bd, 0x3c01a928, 0x47d8adaf, 0x4cf7da73, 0x33a32f12, 0x42631bba, 0x50f972ab,
        0x17a15a85, 0x58d9a915, 0x3a521095, 0x42e1ce89, 0x1da5ceb6, 0x7a827738, 0x1d6fb48, 0x14e571d2, 0x7291aa11, 0x5693ee43,
        0x2416c909, 0x6b4cf117, 0xdaa8570, 0x2b1672e5, 0x443db226, 0x6e884a1, 0x1db1fbc0, 0x54c220df, 0x6c0fdb4, 0x363b4917,
        0x24a96c78, 0x73cb38e4, 0x1824488d, 0x74c9b74, 0x4fb9b4bb, 0x1ef89271, 0x3edb714b, 0xedf2d7e, 0x51b31a69, 0x5b96111d,
        0xfa55610, 0x19347afb, 0x5e63a733, 0x724db89c, 0x10fe9400, 0x1a120bc0, 0x19840bc3, 0x1f2b3f4a, 0x7097b050, 0x28d7ce85,
        0x3b1865ec, 0x41dd453d, 0x2ee0b862, 0x779a9b72, 0x36e4a6e5, 0x6db49662, 0x5edd7fee, 0x5287518b, 0x3bc72403, 0x39884a53,
        0x238d8a26, 0x45a6d1a1, 0x62b65c17, 0x63bfecde, 0x4282e5a1, 0x784d2f2d, 0x4987165, 0x4d4b9e4a, 0x7e065005, 0x6a4a2857,
        0x21a7fbf5, 0x41d89c3f, 0x30db1ed8, 0x62ef99ee, 0x295104e1, 0x639f1c3a, 0x7bc3bf9, 0x75d008c5, 0x6f82cbc9, 0x3edb1898,
        0x2e9d8d9f, 0x14bac726, 0x6f47add3, 0x29bce3de, 0x3b03bece, 0x587bcce5, 0x6f70eff4, 0x7ac5068b, 0x32eebde4, 0x3edfe5f2,
        0x1037d216, 0x2c79bad, 0x7329e12, 0x63dc479e, 0xa86b0c3, 0x2cfeaf1a, 0x29ebb17b, 0x7a8de977, 0x3c6f8025, 0x6f21e8a7,
        0x3f8eac67, 0x3bbe4b4b, 0x40831c89, 0xccbfa11, 0x1cb16b81, 0x2fa30162, 0x6c80f40c, 0x4d6ce847, 0x69a0544b, 0x4719c1e4,
    ],
];

const CastleKeys = [
    0x6899fce0, 0x1f8f64bf, 0x18ef168f, 0x61a20fe3, 0x1bf5aee3, 0x14bd1cf6, 0x76ed6f58, 0x5f02036,
    0x3c781964, 0x399217d, 0x6ec85518, 0x4ecfc41c, 0x64ce2ea2, 0x788f8236, 0x277fcb54, 0x7e927d8b,
];

const CastleBit = { K: 8, Q: 4, k: 2, q: 1 };
const CastlePermission = [
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 11, 15, 15, 15, 3, 15, 15, 7, 15,//white 1011 0011 0111
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 14, 15, 15, 15, 12, 15, 15, 13, 15,//black 1101 1100 1110
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
];
const SideKey = 0x4af0b3d2;

function fileRank2Sq(file, rank) {
    return (rank * 10 + file) + 21;
}

function hashPiece(sq, piece) {
    if (!PieceKeys[piece]) {
        console.log(piece)
    }
    gameBoard.positionKey ^= PieceKeys[piece][sq];
}
function hashEnPassant() {
    gameBoard.positionKey ^= PieceKeys[Pieces.empty][gameBoard.enPassantSq];
}
function hashCastle() {
    gameBoard.positionKey ^= CastleKeys[gameBoard.castlePermission];
}
function hashSide() {
    gameBoard.positionKey ^= SideKey;
}
function rankOf(sq) {
    return Math.floor((sq - 21) / 10);
}
function fileOf(sq) {
    return (sq % 10) - 1;
}
function updatePromotion(move, piece) {
    move &= (~(0xf << 18));//clear the promoted piece
    return move | (piece << 18);
}


const MaxDepth = 64;
const Infinite = 30000;
const Mate = 29000;