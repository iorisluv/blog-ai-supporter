export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  callout?: {
    type: 'tip' | 'warning' | 'prompt' | 'quote';
    title: string;
    content: string;
  };
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: 'Phương pháp luận' | 'Nghiên cứu khoa học' | 'Kỹ năng làm việc' | 'Liêm chính học thuật' | 'Công cụ thực hành';
  readTimeMinutes: number;
  publishDate: string;
  author: {
    name: string;
    role: string;
    university: string;
    avatarInitials: string;
  };
  keyTakeaways: string[];
  sections: ArticleSection[];
  tags: string[];
  likes: number;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'art-1',
    title: 'Khung tư duy RTCE: Bí quyết viết Prompt học thuật chuẩn chỉ cho sinh viên đại học',
    slug: 'khung-tu-duy-rtce-prompt-hoc-thuat',
    summary: 'Loại bỏ các câu lệnh đại khái "Hãy viết giúp em bài tiểu luận". Tiếp cận chuẩn kỹ sư prompt với 4 trụ cột Role - Task - Context - Execution constraints.',
    category: 'Phương pháp luận',
    readTimeMinutes: 6,
    publishDate: '18/10/2026',
    author: {
      name: 'ThS. Nguyễn Hoàng Nam',
      role: 'Cố vấn Phương pháp Nghiên cứu',
      university: 'Đại học Quốc gia TP.HCM',
      avatarInitials: 'HN'
    },
    keyTakeaways: [
      'Gán Persona học thuật giúp AI thu hẹp không gian phản hồi và chọn văn phong trang trọng.',
      'Bối cảnh (Context) càng rõ ràng về năm học và mục tiêu môn học, câu trả lời càng sát sườn.',
      'Thiết lập rào chắn (Constraints) là chìa khóa then chốt để loại bỏ hiện tượng bịa số liệu.'
    ],
    tags: ['Prompt Engineering', 'RTCE', 'Kỹ năng Đại học', 'Phương pháp học'],
    likes: 142,
    sections: [
      {
        heading: '1. Tại sao sinh viên thường thất vọng với câu trả lời của AI?',
        paragraphs: [
          'Phần lớn sinh viên khi mở ChatGPT hoặc Gemini thường gõ những câu lệnh rất chung chung: "Hãy phân tích rủi ro của doanh nghiệp khởi nghiệp" hoặc "Viết giúp mình kết luận bài tiểu luận triết học". Hậu quả là AI trả về những đoạn văn sáo rỗng, lý thuyết suông và hoàn toàn thiếu chiều sâu học thuật.',
          'Mô hình ngôn ngữ lớn (LLM) hoạt động dựa trên xác suất thống kê từ vựng. Khi bạn đưa ra một câu lệnh mơ hồ, AI sẽ chọn câu trả lời có xác suất trung bình cao nhất — nghĩa là câu trả lời phổ thông nhất, ít độc đáo nhất.'
        ],
        callout: {
          type: 'warning',
          title: 'Cạm bẫy "Zero-Context"',
          content: 'Đưa prompt không kèm bối cảnh cũng giống như yêu cầu một người lạ trên đường làm bài tập lớn cho bạn mà không cho họ biết bạn đang học trường nào, môn gì và thầy cô yêu cầu tiêu chuẩn ra sao.'
        }
      },
      {
        heading: '2. Giải mã 4 trụ cột của Khung RTCE',
        paragraphs: [
          'Để biến AI thành một trợ lý nghiên cứu cấp cao, chúng tôi khuyến nghị toàn bộ sinh viên tuân thủ khung RTCE chuẩn hóa:',
          '• R - Role (Vai trò): Định vị chuyên gia cụ thể (Ví dụ: "Bạn là chuyên gia thẩm định rủi ro tài chính có 15 năm kinh nghiệm").',
          '• T - Task (Nhiệm vụ): Định nghĩa chính xác hành động cần thực hiện (Ví dụ: "Hãy lập ma trận đánh giá 5 rủi ro thanh khoản lớn nhất").',
          '• C - Context (Bối cảnh): Nêu rõ bạn là ai, dữ liệu đầu vào là gì và mục đích sử dụng (Ví dụ: "Tôi là sinh viên năm 3 đang làm bài tập nhóm môn Quản trị Tài chính").',
          '• E - Execution Constraints (Ràng buộc thực thi): Các giới hạn bắt buộc (Ví dụ: "Không bịa số liệu, trình bày dạng bảng 4 cột, nêu rõ công thức tính").'
        ],
        callout: {
          type: 'prompt',
          title: 'Mẫu Prompt RTCE mẫu áp dụng ngay',
          content: 'Role: Bạn là giảng viên bộ môn Kinh tế Vi mô.\nContext: Tôi là sinh viên năm 1 đang chuẩn bị thuyết trình về "Độ co giãn của cầu theo giá".\nTask: Hãy phân tích ví dụ thực tế về giá vé máy bay dịp Tết tại Việt Nam để minh họa độ co giãn.\nConstraints: Dùng ngôn ngữ dễ hiểu, lập bảng so sánh giờ cao điểm và thấp điểm, đính kèm 2 câu hỏi thảo luận nhóm.'
        }
      },
      {
        heading: '3. Thực hành kiểm chứng và tinh chỉnh vòng lặp',
        paragraphs: [
          'Một kỹ năng sống còn của sinh viên thế hệ AI không phải là copy câu trả lời đầu tiên, mà là tiến hành "Iterative Refinement" (tinh chỉnh lặp). Hãy yêu cầu AI: "Hãy chỉ ra 2 phản biện phản bác lại phân tích vừa rồi" hoặc "Hãy làm cho văn phong học thuật hơn theo chuẩn tạp chí khoa học".'
        ]
      }
    ]
  },
  {
    id: 'art-2',
    title: 'Chiến lược "Phản biện kép" (Dual Adversarial): Dùng GenAI tự bẻ gãy luận điểm bài tiểu luận',
    slug: 'chien-luoc-phan-bien-kep-dual-adversarial',
    summary: 'Đừng đợi đến lúc đứng trước hội đồng chấm thi mới biết bài mình còn lỗ hổng. Học cách huấn luyện AI đóng vai Giám khảo khó tính nhất để soi từng điểm yếu.',
    category: 'Nghiên cứu khoa học',
    readTimeMinutes: 7,
    publishDate: '15/10/2026',
    author: {
      name: 'Trần Lê Minh',
      role: 'Thủ khoa Đầu ra & Nghiên cứu sinh',
      university: 'Đại học Bách Khoa Hà Nội',
      avatarInitials: 'LM'
    },
    keyTakeaways: [
      'Kỹ thuật Devil\'s Advocate giúp sinh viên tìm ra điểm mù lập luận trước khi nộp bài.',
      'Sử dụng hai cửa sổ AI độc lập: Một bên xây dựng luận điểm, một bên tìm cách phá vỡ.',
      'Giúp bài viết đạt điểm A nhờ sự vững chắc của các luận cứ phản hồi.'
    ],
    tags: ['Tư duy phản biện', 'Tiểu luận', 'Nghiên cứu khoa học', 'Adversarial'],
    likes: 189,
    sections: [
      {
        heading: '1. Nỗi sợ lớn nhất của sinh viên khi bảo vệ đề tài',
        paragraphs: [
          'Hầu hết sinh viên đều từng trải qua cảm giác này: Bạn dành cả tháng viết một bài tiểu luận 20 trang, tự tin rằng mọi thứ rất hoàn hảo. Nhưng khi lên thuyết trình, giảng viên chỉ hỏi một câu đúng vào điểm mù mà bạn chưa từng tính đến, và toàn bộ hệ thống luận điểm sụp đổ.',
          'Nguyên nhân là do thiên kiến xác nhận (Confirmation Bias): Khi tự viết bài, chúng ta vô thức chỉ tìm những bằng chứng ủng hộ ý kiến của mình và lờ đi các mặt trái.'
        ]
      },
      {
        heading: '2. Quy trình thiết lập "Phòng thí nghiệm Phản biện kép"',
        paragraphs: [
          'Bước 1: Soạn thảo luận điểm chính của bạn kèm theo các giả định quan trọng.',
          'Bước 2: Mở một phiên làm việc mới với mô hình AI mạnh về suy luận (như Claude 3.7 hoặc Gemini 2.5 Pro).',
          'Bước 3: Giao nhiệm vụ cho AI đóng vai: "Một giáo sư phản biện cực kỳ khắt khe, không chấp nhận các suy diễn thiếu căn cứ và luôn tìm kiếm các kịch bản ngoại lệ".'
        ],
        callout: {
          type: 'prompt',
          title: 'Prompt "Thử lửa luận điểm" (The Acid Test)',
          content: 'Hãy đọc đoạn lập luận sau đây trong bài nghiên cứu của tôi về [Chủ đề]. Nhiệm vụ của bạn là: 1) Tìm ra 3 lỗ hổng logic lớn nhất; 2) Đặt ra 2 câu hỏi hóc búa nhất mà hội đồng sẽ chất vấn; 3) Chỉ ra các trường hợp mà giả thuyết này sẽ hoàn toàn sai lệch.'
        }
      },
      {
        heading: '3. Cách chuyển hóa lời phản biện thành điểm cộng trong bài viết',
        paragraphs: [
          'Khi AI chỉ ra các lỗ hổng, đừng xóa bài viết đi. Thay vào đó, hãy bổ sung một mục riêng trong tiểu luận: "4. Thảo luận về các giới hạn và kịch bản trái chiều". Giảng viên luôn đánh giá cực kỳ cao những sinh viên có nhận thức rõ ràng về giới hạn nghiên cứu của chính mình!'
        ]
      }
    ]
  },
  {
    id: 'art-3',
    title: 'Từ slide 120 trang đến Flashcard & Audio Overview: 4 bước học sâu cùng Google NotebookLM',
    slug: 'hoc-sau-cung-google-notebooklm',
    summary: 'Cách mạng hóa cách ôn thi đại học: Nạp toàn bộ giáo trình PDF và slide bài giảng vào NotebookLM để học tập có căn cứ (Grounding), loại bỏ 100% ảo giác.',
    category: 'Công cụ thực hành',
    readTimeMinutes: 5,
    publishDate: '12/10/2026',
    author: {
      name: 'Lê Hoàng Anh',
      role: 'Sinh viên năm 4 & Đại sứ AI',
      university: 'Đại học Ngoại Thương',
      avatarInitials: 'HA'
    },
    keyTakeaways: [
      'NotebookLM chỉ trả lời dựa trên tài liệu bạn cung cấp (Source-grounded), không bịa đặt nguồn ngoài.',
      'Tính năng Audio Overview biến tài liệu ôn tập thành một cuộc thảo luận podcast sinh động.',
      'Tự động sinh bộ câu hỏi trắc nghiệm tự luyện kèm số trang đối chiếu.'
    ],
    tags: ['NotebookLM', 'Ôn thi hiệu quả', 'Audio Overview', 'Flashcards'],
    likes: 215,
    sections: [
      {
        heading: '1. Sự khác biệt mang tính cách mạng của Grounded AI',
        paragraphs: [
          'Khác với ChatGPT thông thường lấy dữ liệu từ toàn bộ Internet (và dễ lẫn lộn thông tin), Google NotebookLM là một "vườn tri thức khép kín". Nó chỉ đọc và phân tích những tài liệu bạn tự tải lên: Slide bài giảng của thầy cô, giáo trình chính thức, hoặc các bài báo PDF.',
          'Mỗi câu trả lời của NotebookLM đều có đính kèm trích dẫn số trang chính xác. Bạn chỉ cần bấm vào số trích dẫn để nhảy thẳng đến đoạn văn bản gốc trong tài liệu PDF.'
        ]
      },
      {
        heading: '2. Quy trình 4 bước ôn thi cấp tốc nhưng hiểu bản chất',
        paragraphs: [
          '• Bước 1: Gom toàn bộ slide và đề cương môn học vào một thư mục NotebookLM riêng biệt.',
          '• Bước 2: Dùng lệnh tóm tắt: "Hãy tổng hợp lại 5 định lý cốt lõi xuất hiện nhiều nhất trong các chương và chỉ ra mối liên hệ giữa chúng".',
          '• Bước 3: Tạo Audio Overview để nghe lại trong lúc di chuyển xe bus hoặc tập thể dục. Hai người dẫn ảo sẽ trò chuyện và phân tích các khái niệm phức tạp bằng ngôn từ trực quan.',
          '• Bước 4: Tạo bộ đề thi thử: "Hãy đóng vai thầy dạy môn này, tạo 10 câu hỏi tự luận ngắn kèm đáp án ẩn để tôi tự kiểm tra".'
        ]
      }
    ]
  },
  {
    id: 'art-4',
    title: 'Phòng chống Hallucination (Ảo giác AI): Kỹ thuật Fact-Checking đa nguồn và xác thực trích dẫn',
    slug: 'phong-chong-hallucination-ao-giac-ai',
    summary: 'Không ít sinh viên bị điểm liệt vì trích dẫn những cuốn sách và bài báo khoa học "ảo" do ChatGPT tự bịa. Hướng dẫn quy trình xác thực DOI và bài báo uy tín.',
    category: 'Liêm chính học thuật',
    readTimeMinutes: 8,
    publishDate: '09/10/2026',
    author: {
      name: 'TS. Vũ Minh Châu',
      role: 'Giảng viên & Nhà nghiên cứu Khoa học',
      university: 'Đại học Kinh tế Quốc dân',
      avatarInitials: 'MC'
    },
    keyTakeaways: [
      'LLM không có cơ sở dữ liệu bài báo thời gian thực nếu không kích hoạt tính năng tra cứu chuyên sâu.',
      'Tuyệt đối không chép danh mục tài liệu tham khảo (References) từ AI mà chưa kiểm tra mã DOI.',
      'Sử dụng các công cụ học thuật chuyên dụng như Consensus, Scopus hoặc Google Scholar để đối chiếu.'
    ],
    tags: ['Hallucination', 'Fact Checking', 'Trích dẫn APA', 'Liêm chính học thuật'],
    likes: 167,
    sections: [
      {
        heading: '1. Tại sao AI lại tự bịa ra bài báo khoa học trông rất thật?',
        paragraphs: [
          'Bạn yêu cầu AI: "Hãy cho tôi 5 bài báo khoa học về tác động của ESG đến giá cổ phiếu ngân hàng". AI trả về 5 bài báo có tên tác giả rất quen thuộc (như Fama & French), năm xuất bản 2023, tên tạp chí Journal of Finance cực kỳ uy tín.',
          'Thế nhưng khi bạn copy tên bài báo đó lên Google Scholar, kết quả là 0! Đây chính là hiện tượng Ảo giác (Hallucination). AI ghép nối các từ vựng học thuật phổ biến thành một tài liệu trông có vẻ hợp lý nhưng chưa từng tồn tại trên thế giới.'
        ],
        callout: {
          type: 'warning',
          title: 'Hậu quả học thuật nghiêm trọng',
          content: 'Nhiều trường đại học coi việc đưa trích dẫn ảo (Fake citation) là hành vi gian lận học thuật cấp độ nặng, tương đương với việc ngụy tạo số liệu nghiên cứu.'
        }
      },
      {
        heading: '2. Bộ quy tắc 3 bước kiểm định nguồn gốc trước khi nộp bài',
        paragraphs: [
          '1. Quy tắc mã định danh DOI: Mọi bài báo khoa học quốc tế đều có một chuỗi định danh duy nhất (DOI - Digital Object Identifier). Hãy tra cứu DOI trên doi.org. Nếu không ra bài viết thực, lập tức loại bỏ.',
          '2. Thay thế tìm kiếm thông thường bằng Consensus hoặc Elicit: Những công cụ này được thiết kế riêng cho nghiên cứu học thuật, mỗi câu trả lời đều trích xuất trực tiếp từ các bài báo đã qua bình duyệt (Peer-reviewed).',
          '3. Thêm điều kiện cấm bịa vào prompt: "Nếu bạn không chắc chắn về tài liệu tham khảo có thật hay không, hãy nói rõ là chưa tìm thấy nguồn gốc, tuyệt đối không tự tạo tên tác giả và năm xuất bản".'
        ]
      }
    ]
  },
  {
    id: 'art-5',
    title: 'Đạo đức AI & Liêm chính học thuật: Ranh giới đỏ giữa "Hỗ trợ tư duy" và "Đạo văn công nghệ"',
    slug: 'dao-duc-ai-liem-chinh-hoc-thuat',
    summary: 'Turnitin và các công cụ AI Detector đang quét ngày càng gắt gao. Làm thế nào để sử dụng AI một cách đàng hoàng, tự tin và minh bạch với giảng viên?',
    category: 'Liêm chính học thuật',
    readTimeMinutes: 6,
    publishDate: '04/10/2026',
    author: {
      name: 'Luật sư Phạm Thanh Hải',
      role: 'Chuyên gia Pháp lý & Bản quyền Công nghệ',
      university: 'Đại học Luật Hà Nội',
      avatarInitials: 'TH'
    },
    keyTakeaways: [
      'Hiểu rõ sự khác biệt giữa AI làm giùm (Outsourcing) và AI làm đòn bẩy tư duy (Augmenting).',
      'Cách viết bản "Tuyên bố sử dụng AI" (AI Disclosure Statement) chuẩn chỉnh cuối mỗi đồ án.',
      'Không chỉnh sửa văn phong của AI bằng cách đảo từ đối phó; hãy tự tay viết lại bằng tư duy của chính mình.'
    ],
    tags: ['Đạo đức AI', 'Turnitin', 'AI Detector', 'Liêm chính học thuật'],
    likes: 198,
    sections: [
      {
        heading: '1. Thầy cô thực sự nghĩ gì về việc sinh viên dùng AI?',
        paragraphs: [
          'Một hiểu lầm phổ biến là giảng viên cấm tuyệt đối sinh viên đụng vào AI. Trên thực tế, hầu hết các trường đại học tiến bộ đều khuyến khích sinh viên làm chủ công nghệ mới. Điều khiến thầy cô thất vọng là sự lười biếng tư duy: Sinh viên copy nguyên xi câu trả lời từ chatbot mà bản thân không hiểu một từ nào trong đó.',
          'Khi được hỏi phản biện, sinh viên ú ớ vì ngôn từ trong bài là của AI chứ không phải kiến thức đã được tiêu hóa vào não.'
        ]
      },
      {
        heading: '2. Khung phân định 3 vùng: Xanh - Vàng - Đỏ',
        paragraphs: [
          '• Vùng XANH (Khuyến khích): Dùng AI để brainstorm ý tưởng, giải thích khái niệm khó, tìm kiếm nguồn tài liệu, sửa lỗi ngữ pháp tiếng Anh, tạo kịch bản luyện nói.',
          '• Vùng VÀNG (Cần minh bạch): Dùng AI để gợi ý dàn ý chi tiết bài viết, viết các đoạn code boilerplate cơ bản — Cần trích dẫn rõ trong phần ghi chú.',
          '• Vùng ĐỎ (Cấm tuyệt đối): Copy toàn bộ đoạn văn luận do AI sinh ra và nộp dưới tên của mình; sử dụng AI làm bài thi trực tuyến hoặc thi cuối kỳ.'
        ],
        callout: {
          type: 'tip',
          title: 'Mẫu Tuyên bố sử dụng AI mẫu (AI Disclosure Statement)',
          content: '"Trong bài nghiên cứu này, tác giả đã sử dụng công cụ Gemini 2.5 với mục đích hỗ trợ tra cứu cấu trúc ngữ pháp và phản biện dàn ý ban đầu. Toàn bộ nội dung phân tích, số liệu thực nghiệm và kết luận bài viết đều do tác giả tự thực hiện và chịu trách nhiệm."'
        }
      }
    ]
  },
  {
    id: 'art-6',
    title: 'Tối ưu hóa đồ án môn học & Kỹ năng chuẩn bị đi làm: Tự động hóa báo cáo tuần và biên bản họp',
    slug: 'toi-uu-hoa-do-an-va-chuan-bi-di-lam',
    summary: 'Chuyển hóa kỹ năng AI học đường thành lợi thế cạnh tranh khi đi thực tập: Tự động hóa biên bản họp nhóm, viết báo cáo tiến độ và tạo slide thuyết trình chuyên nghiệp.',
    category: 'Kỹ năng làm việc',
    readTimeMinutes: 7,
    publishDate: '01/10/2026',
    author: {
      name: 'Đặng Mai Phương',
      role: 'Product Lead & Mentor Sinh viên',
      university: 'Đại học RMIT Việt Nam',
      avatarInitials: 'MP'
    },
    keyTakeaways: [
      'Ghi âm cuộc họp nhóm và tạo Action Items tự động chỉ trong 60 giây.',
      'Sử dụng công cụ tạo slide AI như Gamma để tiết kiệm 70% thời gian thiết kế.',
      'Tối ưu CV ứng tuyển thực tập và chuẩn bị câu trả lời phỏng vấn theo phương pháp STAR.'
    ],
    tags: ['Làm việc nhóm', 'Thực tập sinh', 'Gamma AI', 'Năng suất làm việc'],
    likes: 231,
    sections: [
      {
        heading: '1. Làm việc nhóm đại học không còn là "ác mộng"',
        paragraphs: [
          'Ai cũng từng gặp cảnh họp nhóm 2 tiếng đồng hồ nhưng cuối cùng không ai nhớ mình phải làm gì, phân công công việc không rõ ràng và bài nộp bị trễ hạn. GenAI có thể giải quyết triệt để vấn đề này.',
          'Chỉ cần paste bản ghi chép thô hoặc ghi âm cuộc họp vào AI với prompt chuẩn: "Hãy trích xuất: 1) 3 quyết định quan trọng nhất đã thống nhất; 2) Danh sách việc cần làm (Action Items) theo định dạng: Ai làm - Việc gì - Deadline ngày nào". Bạn sẽ có ngay một biên bản họp chuyên nghiệp gửi lên nhóm Zalo/Slack.'
        ]
      },
      {
        heading: '2. Nâng tầm CV thực tập với phương pháp STAR và AI',
        paragraphs: [
          'Khi nộp hồ sơ xin việc, các nhà tuyển dụng thường quét CV bằng phần mềm ATS. Thay vì ghi chung chung "Tham gia câu lạc bộ sinh viên", hãy yêu cầu AI tái cấu trúc thành tích của bạn theo mô hình STAR (Situation - Task - Action - Result) với số liệu cụ thể.',
          'Ví dụ: "Tổ chức chiến dịch truyền thông tuyển thành viên mới" -> "Chỉ đạo chiến dịch truyền thông số tiếp cận 15.000 sinh viên, tăng 40% lượng đơn đăng ký ứng tuyển trong 2 tuần".'
        ]
      }
    ]
  }
];
