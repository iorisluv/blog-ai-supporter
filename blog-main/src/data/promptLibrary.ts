export interface PromptTemplate {
  id: string;
  title: string;
  category: 'Kinh tế & QTKD' | 'CNTT & Kỹ thuật' | 'Y Dược & Tự nhiên' | 'KHXH & Ngôn ngữ' | 'Nghiên cứu & Học thuật';
  majorTag: string;
  description: string;
  promptText: string;
  bestFor: string;
  difficulty: 'Cơ bản' | 'Nâng cao' | 'Chuyên sâu';
  tips: string;
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'pr-1',
    title: 'Phân tích SWOT & Chiến lược cạnh tranh cho Case Study',
    category: 'Kinh tế & QTKD',
    majorTag: 'Kinh tế',
    description: 'Biến một tình huống kinh doanh phức tạp thành ma trận SWOT trực quan kèm chiến lược kết hợp SO, WO, ST, WT rõ ràng.',
    promptText: `[VAI TRÒ / PERSONA]
Bạn là một Giám đốc Chiến lược Doanh nghiệp và Giảng viên hướng dẫn môn Quản trị Chiến lược tại đại học hàng đầu.

[BỐI CẢNH]
Tôi là sinh viên đang làm bài tập phân tích tình huống doanh nghiệp: "[TÊN DOANH NGHIỆP]" trong bối cảnh thị trường [BỐI CẢNH THỊ TRƯỜNG/NĂM].

[NHIỆM VỤ]
1. Xây dựng bảng ma trận SWOT chi tiết (mỗi góc phần tư có ít nhất 4 điểm then chốt có số liệu/dẫn chứng).
2. Phát triển 4 nhóm chiến lược hành động:
   - Chiến lược SO (Tận dụng điểm mạnh để nắm bắt cơ hội)
   - Chiến lược WO (Khắc phục điểm yếu nhờ cơ hội)
   - Chiến lược ST (Dùng điểm mạnh để vượt qua thách thức)
   - Chiến lược WT (Phòng thủ và hạn chế rủi ro)

[RÀNG BUỘC]
- Tuyệt đối không đưa ra các nhận định chung chung sáo rỗng.
- Mọi điểm phân tích phải gắn liền với đặc thù ngành và đối thủ cạnh tranh chính.
- Nêu rõ 2 rủi ro thất bại tiềm ẩn của chiến lược được đề xuất.`,
    bestFor: 'ChatGPT / Claude / Gemini',
    difficulty: 'Nâng cao',
    tips: 'Nên đính kèm báo cáo tài chính hoặc bài báo mới nhất về doanh nghiệp để AI phân tích chuẩn xác nhất.'
  },
  {
    id: 'pr-2',
    title: 'Học sâu & Tóm tắt cơ chế Bệnh sinh / Dược lý học',
    category: 'Y Dược & Tự nhiên',
    majorTag: 'Y Dược',
    description: 'Hệ thống hóa các cơ chế phân tử và đường dẫn sinh hóa phức tạp thành sơ đồ tư duy có bước suy luận nhân quả.',
    promptText: `[VAI TRÒ / PERSONA]
Bạn là một Giáo sư Bác sĩ chuyên ngành [CHUYÊN KHOA, ví dụ: Tim mạch / Dược lý học] có kinh nghiệm giảng dạy sinh viên Y khoa.

[BỐI CẢNH]
Tôi là sinh viên Y khoa năm [X] đang học về bệnh lý / hoạt chất: "[TÊN BỆNH LÝ HOẶC THUỐC]".

[NHIỆM VỤ]
1. Giải thích cơ chế bệnh sinh (Pathogenesis) hoặc cơ chế tác dụng (Mechanism of Action) theo từng bước nhân quả (Step-by-step cascade).
2. Vẽ sơ đồ luồng tác động bằng ký hiệu ASCII hoặc gạch đầu dòng phân cấp (Từ thụ thể tế bào -> Thay đổi nội bào -> Biểu hiện triệu chứng lâm sàng).
3. Lập bảng so sánh 3 tác dụng phụ thường gặp nhất và cơ chế sinh lý học giải thích nguyên nhân gây ra tác dụng phụ đó.

[RÀNG BUỘC]
- Dùng danh pháp Y khoa chuẩn quốc tế (kèm thuật ngữ tiếng Anh gốc).
- Căn cứ trên phác đồ điều trị chuẩn của Bộ Y tế hoặc hiệp hội chuyên khoa quốc tế (AHA, ESC, WHO).
- Không tự suy diễn liều lượng nếu không có trong hướng dẫn chuẩn.`,
    bestFor: 'Consensus / Gemini 2.5 / Claude',
    difficulty: 'Chuyên sâu',
    tips: 'Đối chiếu với sách Dược lý học lâm sàng của trường để đảm bảo tương thích với đề thi.'
  },
  {
    id: 'pr-3',
    title: 'Review Code, Tối ưu hóa Big-O & Giải thích Thuật toán',
    category: 'CNTT & Kỹ thuật',
    majorTag: 'Công nghệ',
    description: 'Chấm điểm mã nguồn, tìm lỗi edge-case tiềm ẩn, phân tích độ phức tạp thời gian/bộ nhớ và refactor code.',
    promptText: `[VAI TRÒ / PERSONA]
Bạn là Kỹ sư phần mềm cao cấp (Staff Software Engineer) và trợ giảng môn Cấu trúc dữ liệu & Giải thuật.

[BỐI CẢNH]
Tôi là sinh viên CNTT đang nộp bài tập giải thuật hoặc đồ án môn học. Đây là đoạn code của tôi:
\`\`\`[NGÔN NGỮ, ví dụ: Python/Java/C++]
[PASTE CODE CỦA BẠN VÀO ĐÂY]
\`\`\`

[NHIỆM VỤ]
1. Đánh giá độ phức tạp thuật toán hiện tại: Time Complexity (Big-O) và Space Complexity (Big-O). Giải thích tại sao.
2. Tìm ra ít nhất 2 trường hợp kiểm thử biên (Edge cases) có thể làm sập thuật toán (ví dụ: mảng rỗng, giá trị âm, tràn số).
3. Viết lại phiên bản tối ưu hơn kèm chú thích dòng lệnh rõ ràng và giải thích tại sao cách mới chạy nhanh hơn.

[RÀNG BUỘC]
- Không dùng các thư viện ẩn không được phép trong bài thi.
- Tuân thủ nguyên tắc Clean Code và quy ước đặt tên chuẩn của ngôn ngữ.`,
    bestFor: 'Cursor / ChatGPT / Gemini',
    difficulty: 'Nâng cao',
    tips: 'Cung cấp cả yêu cầu đề bài của thầy cô để AI kiểm tra xem bạn có vi phạm ràng buộc không gian O(1) hay không.'
  },
  {
    id: 'pr-4',
    title: 'Phản biện Án lệ & Khung Lý luận Pháp lý',
    category: 'KHXH & Ngôn ngữ',
    majorTag: 'Luật học',
    description: 'Mổ xẻ vụ án pháp lý hoặc tình huống tranh chấp theo cấu trúc IRAC (Issue - Rule - Application - Conclusion).',
    promptText: `[VAI TRÒ / PERSONA]
Bạn là Thẩm phán cao cấp và Luật sư tranh tụng am hiểu sâu sắc hệ thống pháp luật Việt Nam.

[BỐI CẢNH]
Tôi là sinh viên Luật đang làm bài tập nghiên cứu tình huống tranh chấp sau:
"[MÔ TẢ TÌNH HUỐNG TRANH CHẤP]"

[NHIỆM VỤ]
Áp dụng phương pháp phân tích IRAC chuẩn ngành Luật:
1. Issue (Vấn đề pháp lý trọng tâm): Nêu 2 câu hỏi pháp lý cốt lõi cần giải quyết.
2. Rule (Quy phạm pháp luật áp dụng): Liệt kê các điều khoản luật hiện hành cụ thể (Bộ luật Dân sự, Luật Thương mại, Nghị định liên quan).
3. Application (Vận dụng vào tình huống): Phân tích lập luận của bên nguyên đơn và bên bị đơn.
4. Conclusion (Đề xuất phán quyết): Đưa ra kết luận có căn cứ pháp luật vững chắc.

[RÀNG BUỘC]
- Nêu rõ số hiệu văn bản luật và điều khoản cụ thể, không nêu chung chung "theo quy định pháp luật".
- Nếu có cách giải thích luật khác nhau giữa các cơ quan tài phán, hãy nêu rõ cả hai góc nhìn.`,
    bestFor: 'Claude 3.7 / Gemini',
    difficulty: 'Chuyên sâu',
    tips: 'Luôn tra cứu lại văn bản luật trên Thư Viện Pháp Luật để đảm bảo văn bản chưa hết hiệu lực thi hành.'
  },
  {
    id: 'pr-5',
    title: 'Tổng quan Y văn (Literature Review) 3 Vòng cho Nghiên cứu Khoa học',
    category: 'Nghiên cứu & Học thuật',
    majorTag: 'NCKH',
    description: 'Hỗ trợ sinh viên đọc và tổng hợp 10+ bài báo khoa học chuẩn quốc tế mà không bị ngợp thông tin.',
    promptText: `[VAI TRÒ / PERSONA]
Bạn là Cố vấn Nghiên cứu Khoa học và Biên tập viên bình duyệt (Peer Reviewer) của một tạp chí khoa học quốc tế uy tín.

[BỐI CẢNH]
Tôi là sinh viên đang thực hiện đề tài Nghiên cứu Khoa học Sinh viên: "[TÊN ĐỀ TÀI CỦA BẠN]".

[NHIỆM VỤ]
Dưới đây là phần tóm tắt (Abstract) của 3 bài báo khoa học tôi đã thu thập:
[PASTE ABSTRACT CỦA CÁC BÀI BÁO]

Hãy giúp tôi xây dựng bảng tổng quan tài liệu (Literature Matrix) gồm các cột:
1. Tác giả & Năm công bố
2. Phương pháp nghiên cứu & Cỡ mẫu
3. Kết quả chính phát hiện được
4. Khoảng trống nghiên cứu (Research Gap) mà tác giả chưa giải quyết được
5. Gợi ý cách đề tài của tôi có thể kế thừa và lấp đầy khoảng trống đó.

[RÀNG BUỘC]
- Tách bạch giữa dữ kiện thực tế của tác giả và suy luận của bạn.
- Viết văn phong học thuật khách quan, trang trọng, chuẩn mực IMRaD.`,
    bestFor: 'Consensus / NotebookLM / Perplexity',
    difficulty: 'Chuyên sâu',
    tips: 'Rất hữu ích khi viết Chương 1: Tổng quan tình hình nghiên cứu trong khóa luận tốt nghiệp.'
  },
  {
    id: 'pr-6',
    title: 'Luyện thi Tiếng Anh Học thuật (IELTS Writing Task 2 / Phản biện luận điểm)',
    category: 'KHXH & Ngôn ngữ',
    majorTag: 'Ngoại ngữ',
    description: 'Chấm điểm bài luận theo 4 tiêu chí chấm thi quốc tế, chỉ ra lỗi diễn đạt và cung cấp từ vựng C1/C2 sát ngữ cảnh.',
    promptText: `[VAI TRÒ / PERSONA]
Bạn là Chuyên gia Khảo thí và Giám khảo chấm thi Viết Tiếng Anh Học thuật (IELTS Examiner).

[BỐI CẢNH]
Đây là bài viết của tôi cho đề bài: "[NHẬP ĐỀ BÀI]"
Bài làm:
\`\`\`
[NHẬP BÀI VIẾT CỦA BẠN]
\`\`\`

[NHIỆM VỤ]
1. Đánh giá chi tiết theo 4 tiêu chí:
   - Task Achievement (Mức độ hoàn thành nhiệm vụ)
   - Coherence & Cohesion (Tính mạch lạc và liên kết)
   - Lexical Resource (Vốn từ vựng)
   - Grammatical Range & Accuracy (Ngữ pháp và độ chính xác)
2. Chỉ ra 3 lỗi diễn đạt lặp từ hoặc dùng từ gượng gạo và gợi ý cụm từ thay thế tự nhiên ở trình độ C1.
3. Viết lại 1 đoạn thân bài mẫu theo cấu trúc PEEL hoàn hảo.`,
    bestFor: 'Claude 3.7 / ChatGPT',
    difficulty: 'Cơ bản',
    tips: 'Luyện tập mỗi tuần 2 đề để tăng band điểm nhanh chóng.'
  }
];

export interface AITool {
  id: string;
  name: string;
  category: string;
  pricing: 'Miễn phí 100%' | 'Freemium (Bản miễn phí rất tốt)' | 'Có gói sinh viên ưu đãi';
  badge: string;
  bestUseCases: string[];
  studentPros: string;
  limitations: string;
  url: string;
}

export const AI_TOOLS_DIRECTORY: AITool[] = [
  {
    id: 'notebooklm',
    name: 'Google NotebookLM',
    category: 'Ghi chú & Tự học cá nhân hóa',
    pricing: 'Miễn phí 100%',
    badge: 'Khuyên dùng cho sinh viên',
    bestUseCases: [
      'Nạp toàn bộ giáo trình PDF & slide môn học để hỏi đáp có trích dẫn số trang',
      'Tạo Audio Overview (Podcast 2 người trò chuyện tóm tắt bài học)',
      'Tự động tạo câu hỏi trắc nghiệm và flashcards ôn thi cuối kỳ'
    ],
    studentPros: 'Hoàn toàn không có ảo giác do chỉ trả lời dựa trên file bạn tải lên; hoàn toàn miễn phí không giới hạn.',
    limitations: 'Chưa hỗ trợ sinh ảnh hay tương tác với môi trường bên ngoài.',
    url: 'https://notebooklm.google.com'
  },
  {
    id: 'consensus',
    name: 'Consensus AI',
    category: 'Nghiên cứu Khoa học & Tìm nguồn bài báo',
    pricing: 'Freemium (Bản miễn phí rất tốt)',
    badge: 'Chuyên gia NCKH',
    bestUseCases: [
      'Tìm kiếm câu trả lời khoa học trực tiếp từ 200+ triệu bài báo có bình duyệt',
      'Đo lường mức độ đồng thuận khoa học (Consensus Meter: Đồng ý / Phản đối)',
      'Trích xuất tóm tắt kết quả nghiên cứu và phương pháp thực nghiệm'
    ],
    studentPros: '100% trích dẫn thật có mã DOI và link đọc bài báo, cứu tinh khi làm tiểu luận và khóa luận.',
    limitations: 'Bản miễn phí giới hạn số lượt hỏi sâu trong tháng.',
    url: 'https://consensus.app'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'Tìm kiếm học thuật thời gian thực',
    pricing: 'Freemium (Bản miễn phí rất tốt)',
    badge: 'Tra cứu đa nguồn',
    bestUseCases: [
      'Tìm kiếm thông tin thời sự mới nhất có đính kèm nguồn báo chí uy tín',
      'Tra cứu số liệu thống kê kinh tế xã hội phục vụ bài thuyết trình',
      'Chế độ Focus Academic để chỉ quét các kho lưu trữ học thuật'
    ],
    studentPros: 'Giao diện trực quan, liệt kê nguồn bài viết rõ ràng giúp sinh viên dễ dàng dẫn nguồn.',
    limitations: 'Cần kiểm tra lại nguồn trích dẫn xem có phải báo chính thống không.',
    url: 'https://perplexity.ai'
  },
  {
    id: 'claude',
    name: 'Anthropic Claude',
    category: 'Lập luận, Viết luận & Phản biện sâu',
    pricing: 'Freemium (Bản miễn phí rất tốt)',
    badge: 'Văn phong học thuật số 1',
    bestUseCases: [
      'Phản biện bài viết và tìm lỗ hổng lập luận trong đề cương nghiên cứu',
      'Biên tập văn phong tiếng Việt/Anh chuẩn mực học thuật, không bị mùi máy móc',
      'Đọc và phân tích cùng lúc nhiều tài liệu PDF dài'
    ],
    studentPros: 'Khả năng tư duy logic và diễn đạt ngôn ngữ tự nhiên nhất hiện nay.',
    limitations: 'Giới hạn số tin nhắn trên gói miễn phí vào giờ cao điểm.',
    url: 'https://claude.ai'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'Đa phương thức & Tích hợp Workspace',
    pricing: 'Freemium (Bản miễn phí rất tốt)',
    badge: 'Hệ sinh thái Google',
    bestUseCases: [
      'Kết nối trực tiếp với Google Docs, Drive và Gmail của tài khoản sinh viên',
      'Phân tích biểu đồ, hình vẽ và đề thi viết tay chụp từ điện thoại',
      'Tạo dàn ý bài tập nhóm và chia sẻ trực tiếp sang Google Docs'
    ],
    studentPros: 'Cửa sổ ngữ cảnh khổng lồ, xử lý video bài giảng và sách hàng trăm trang cực mượt.',
    limitations: 'Đôi khi câu trả lời còn mang tính bao quát rộng.',
    url: 'https://gemini.google.com'
  },
  {
    id: 'gamma',
    name: 'Gamma App',
    category: 'Thiết kế Slide & Báo cáo đồ án',
    pricing: 'Freemium (Bản miễn phí rất tốt)',
    badge: 'Thuyết trình nhóm',
    bestUseCases: [
      'Biến đề cương văn bản thô thành bộ Slide thuyết trình tuyệt đẹp trong 2 phút',
      'Tạo trang web tài liệu nhóm (Webpage) nộp đồ án môn học',
      'Tự động chọn bố cục, màu sắc và icon phù hợp với chủ đề'
    ],
    studentPros: 'Tiết kiệm 80% thời gian căn chỉnh PowerPoint cho các bài thuyết trình hàng tuần.',
    limitations: 'Bản miễn phí dùng hệ thống credit tiêu hao khi tạo slide mới.',
    url: 'https://gamma.app'
  },
  {
    id: 'cursor',
    name: 'Cursor Editor',
    category: 'Lập trình & Kỹ thuật phần mềm',
    pricing: 'Freemium (Bản miễn phí rất tốt)',
    badge: 'Dành riêng cho dân IT',
    bestUseCases: [
      'Trợ lý code AI thông minh hiểu toàn bộ codebase của đồ án',
      'Giải thích từng dòng code của các thuật toán khó trong đề cương thực hành',
      'Debug lỗi và viết unit tests tự động'
    ],
    studentPros: 'Tăng tốc độ hoàn thành đồ án môn học lên gấp 3 lần cho sinh viên CNTT/Điện tử.',
    limitations: 'Chỉ phù hợp với sinh viên có học môn lập trình.',
    url: 'https://cursor.com'
  },
  {
    id: 'zotero',
    name: 'Zotero + Zotero AI Plugins',
    category: 'Quản lý Trích dẫn & Thư viện học thuật',
    pricing: 'Miễn phí 100%',
    badge: 'Tiêu chuẩn quốc tế',
    bestUseCases: [
      'Lưu trữ toàn bộ bài báo khoa học chỉ với 1 cú click trên trình duyệt',
      'Tự động xuất danh mục tài liệu tham khảo chuẩn APA 7th, IEEE, Harvard',
      'Đồng bộ ghi chú và trích dẫn trực tiếp vào Microsoft Word hoặc Google Docs'
    ],
    studentPros: 'Là phần mềm mã nguồn mở miễn phí vĩnh viễn, được mọi trường đại học trên thế giới công nhận.',
    limitations: 'Cần cài đặt phần mềm trên máy tính cá nhân.',
    url: 'https://zotero.org'
  }
];
