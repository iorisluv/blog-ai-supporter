export interface QuizQuestion {
  id: number;
  question: string;
  scenario: string;
  options: {
    text: string;
    score: number; // 1 to 4
    feedback: string;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Khi cần nhờ AI hỗ trợ làm bài tiểu luận môn học, bạn thường đặt câu lệnh như thế nào?',
    scenario: 'Tình huống: Giảng viên giao bài tập phân tích một đề tài kéo dài 15 trang.',
    options: [
      {
        text: 'Gõ một câu ngắn gọn: "Hãy viết bài tiểu luận về đề tài X cho mình."',
        score: 1,
        feedback: 'Đây là cách dùng thụ động mức sơ cấp, dễ nhận về kết quả sáo rỗng và thiếu chất lượng học thuật.'
      },
      {
        text: 'Nêu thêm độ dài mong muốn và yêu cầu văn phong lịch sự hoặc chia thành các mục.',
        score: 2,
        feedback: 'Bạn đã bắt đầu định dạng nhưng vẫn thiếu Persona chuyên môn và bối cảnh môn học cụ thể.'
      },
      {
        text: 'Áp dụng khung RTCE: Xác định vai trò chuyên gia, bối cảnh môn học, dàn ý sơ bộ và các tiêu chí cụ thể.',
        score: 3,
        feedback: 'Rất tốt! Bạn hiểu cách kiểm soát không gian sinh từ của mô hình ngôn ngữ lớn.'
      },
      {
        text: 'Gán Persona phản biện, cung cấp tài liệu mẫu (Few-shot), yêu cầu suy luận từng bước (Chain-of-Thought) và cấm bịa nguồn.',
        score: 4,
        feedback: 'Xuất sắc! Bạn làm chủ kỹ thuật Prompt Engineering bậc cao chuẩn mực học thuật.'
      }
    ]
  },
  {
    id: 2,
    question: 'Khi AI trả về một danh sách tài liệu tham khảo kèm tác giả và năm xuất bản, bạn xử lý ra sao?',
    scenario: 'Tình huống: Bạn cần trích dẫn 5 nguồn cho bài báo cáo nghiên cứu.',
    options: [
      {
        text: 'Sao chép ngay vào mục Tài liệu tham khảo vì thấy tên tác giả và tên tạp chí rất quen thuộc.',
        score: 1,
        feedback: 'Cực kỳ nguy hiểm! Bạn có thể dính lỗi đạo văn hoặc trích dẫn ảo (Fake citation) do hallucination.'
      },
      {
        text: 'Đọc lướt qua xem tên bài viết có khớp với nội dung bài của mình không rồi mới dùng.',
        score: 2,
        feedback: 'Vẫn chưa đủ an toàn vì AI hoàn toàn có thể tự bịa ra một tựa đề bài báo rất logic.'
      },
      {
        text: 'Tìm kiếm tên bài báo trên Google Scholar để xác nhận xem bài báo đó có thực sự tồn tại hay không.',
        score: 3,
        feedback: 'Tốt! Bạn đã có ý thức kiểm chứng tính xác thực của nguồn tin.'
      },
      {
        text: 'Kiểm tra mã DOI trực tiếp trên doi.org, đọc Abstract bài gốc và dùng công cụ như Consensus/Zotero để lưu trữ.',
        score: 4,
        feedback: 'Chuẩn phong cách nhà nghiên cứu! Bạn bảo vệ 100% tính liêm chính học thuật.'
      }
    ]
  },
  {
    id: 3,
    question: 'Bạn đối phó thế nào khi phải ôn tập một tập tài liệu/slide môn học dài hơn 150 trang trước kỳ thi?',
    scenario: 'Tình huống: Còn 4 ngày nữa là đến kỳ thi cuối kỳ, khối lượng kiến thức khổng lồ.',
    options: [
      {
        text: 'Đọc lướt và copy từng đoạn nhỏ dán vào ChatGPT để dịch hoặc tóm tắt sơ sài.',
        score: 1,
        feedback: 'Mất nhiều thời gian và dễ làm mất ngữ cảnh tổng thể của môn học.'
      },
      {
        text: 'Tìm kiếm tóm tắt trên mạng do các khóa trước để lại.',
        score: 2,
        feedback: 'Hữu ích nhưng có thể bị lệch với trọng tâm năm học hiện tại của thầy cô.'
      },
      {
        text: 'Tải toàn bộ PDF vào Google NotebookLM để tạo bộ câu hỏi ôn tập có đối chứng số trang.',
        score: 3,
        feedback: 'Chiến lược thông minh! Tiết kiệm 60% thời gian tổng hợp mà không sợ bịa kiến thức.'
      },
      {
        text: 'Kết hợp NotebookLM để tạo Audio Overview nghe thụ động, sau đó dùng Claude/Gemini làm bài thi thử phản biện sâu.',
        score: 4,
        feedback: 'Bậc thầy tối ưu hóa việc học! Bạn kết hợp đa công cụ theo thế mạnh chuyên biệt.'
      }
    ]
  },
  {
    id: 4,
    question: 'Quan điểm của bạn về Liêm chính học thuật (Academic Integrity) khi sử dụng GenAI là gì?',
    scenario: 'Tình huống: Trường học bắt đầu áp dụng phần mềm kiểm tra AI và đạo văn Turnitin.',
    options: [
      {
        text: 'Dùng các công cụ spin chữ (Paraphrase) để giảm phần trăm AI phát hiện.',
        score: 1,
        feedback: 'Đây là tư duy đối phó nguy hiểm, làm suy giảm năng lực tự thân và vẫn dễ bị thầy cô nhận ra khi vấn đáp.'
      },
      {
        text: 'Chỉ dùng AI sửa lỗi chính tả vì sợ bị đánh trượt môn nếu đụng vào.',
        score: 2,
        feedback: 'An toàn nhưng bạn đang bỏ lỡ cơ hội biến AI thành người gia sư kèm cặp 24/7.'
      },
      {
        text: 'Dùng AI để gợi ý dàn ý và mở rộng góc nhìn, sau đó tự tay viết lại toàn bộ bằng văn phong của mình.',
        score: 3,
        feedback: 'Rất chuẩn mực! Bạn giữ vững quyền làm chủ bài viết của người học.'
      },
      {
        text: 'Minh bạch việc sử dụng bằng "Tuyên bố sử dụng AI", dùng AI làm đối tác tư duy phản biện (Thought Partner) và tự chịu trách nhiệm.',
        score: 4,
        feedback: 'Tư duy của sinh viên thế hệ mới xuất sắc: Vừa thành thạo công nghệ vừa giữ trọn liêm chính.'
      }
    ]
  },
  {
    id: 5,
    question: 'Trong làm việc nhóm hoặc chuẩn bị hồ sơ thực tập, bạn ứng dụng AI ở mức độ nào?',
    scenario: 'Tình huống: Nhóm có 5 thành viên cần họp, phân công nhiệm vụ và bạn cần nộp CV ứng tuyển công ty.',
    options: [
      {
        text: 'Chưa từng dùng AI cho việc nhóm hay viết CV, chỉ tự làm thủ công.',
        score: 1,
        feedback: 'Bạn đang tốn nhiều thời gian cho các tác vụ lặp đi lặp lại có thể tự động hóa.'
      },
      {
        text: 'Nhờ ChatGPT viết giúp thư xin việc (Cover Letter) theo mẫu có sẵn trên mạng.',
        score: 2,
        feedback: 'Có sử dụng nhưng mẫu chung chung khó gây ấn tượng với nhà tuyển dụng.'
      },
      {
        text: 'Dùng AI tóm tắt biên bản họp nhóm ra Action Items và chuẩn hóa CV theo phương pháp STAR.',
        score: 3,
        feedback: 'Hiệu quả cao! Bạn đã biết chuyển hóa AI thành công cụ nâng cao năng suất thực chiến.'
      },
      {
        text: 'Xây dựng quy trình tự động hóa: Từ ghi âm họp -> Tạo slide Gamma -> Mock Interview đàm thoại luyện phỏng vấn với AI.',
        score: 4,
        feedback: 'Đẳng cấp sinh viên chuyên nghiệp! Bạn đã sẵn sàng dẫn đầu môi trường làm việc số.'
      }
    ]
  }
];

export interface ForumComment {
  id: string;
  authorName: string;
  university: string;
  timestamp: string;
  content: string;
}

export interface ForumPost {
  id: string;
  title: string;
  authorName: string;
  university: string;
  major: string;
  year: string;
  category: 'Kinh nghiệm NCKH' | 'Học tập & Ôn thi' | 'Đồ án & Nhóm' | 'Kỹ năng đi làm' | 'Đạo đức & Tranh luận';
  content: string;
  promptShared?: string;
  tags: string[];
  upvotes: number;
  comments: ForumComment[];
  isBookmarked?: boolean;
}

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    title: 'Cách nhóm mình dùng AI đọc 25 bài báo Scopus trong 4 ngày để làm đề cương NCKH đạt giải Nhất',
    authorName: 'Đặng Quốc Huy',
    university: 'Đại học Bách Khoa TP.HCM',
    major: 'Khoa học Máy tính',
    year: 'Năm 4',
    category: 'Kinh nghiệm NCKH',
    content: 'Chào các bạn sinh viên! Vừa rồi nhóm mình vừa giành giải Nhất NCKH cấp trường. Bí quyết lớn nhất không phải là cày đêm, mà là đổi cách đọc tài liệu. Thay vì mở từng file PDF 30 trang ra đọc từ đầu đến cuối, nhóm mình dùng Consensus kết hợp NotebookLM theo mô hình "Phễu 3 tầng". Tầng 1: Lọc câu trả lời khoa học. Tầng 2: Nạp vào NotebookLM để trích xuất Research Gap. Tầng 3: Tự tay viết lại phần Tổng quan y văn. Các thầy chấm đánh giá cực cao vì trích dẫn 100% chuẩn xác và chỉ ra được điểm yếu của các nghiên cứu trước!',
    promptShared: `Dưới đây là phần Abstract và Conclusion của bài báo [Tên bài]. Hãy đóng vai trò nhà nghiên cứu độc lập, chỉ ra:
1. Phương pháp thực nghiệm của tác giả có hạn chế gì về cỡ mẫu hoặc biến số?
2. Trong bối cảnh tại Việt Nam, kết quả này có thể bị thay đổi ra sao?
3. Đề xuất 1 hướng mở rộng nghiên cứu mới từ lỗ hổng này.`,
    tags: ['NCKH', 'Consensus', 'Scopus', 'Giải Nhất'],
    upvotes: 84,
    comments: [
      {
        id: 'c-1',
        authorName: 'Trịnh Thảo Vy',
        university: 'ĐH Kinh tế Quốc dân',
        timestamp: '2 giờ trước',
        content: 'Cảm ơn anh Huy! Nhóm em cũng đang ngập trong đống tài liệu môn Phương pháp nghiên cứu, áp dụng thử cách này thấy nhẹ đầu hẳn.'
      },
      {
        id: 'c-2',
        authorName: 'Lê Minh Tuấn',
        university: 'ĐH Quốc tế ĐHQG',
        timestamp: '5 giờ trước',
        content: 'Prompt này dùng trên Claude hay Gemini cho kết quả sắc sảo hơn vậy anh?'
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Prompt "Thầy chấm thi khó tính" giúp mình tăng từ 6.5 lên 8.5 điểm môn Triết học Mác - Lênin',
    authorName: 'Nguyễn Thị Minh Hằng',
    university: 'Đại học Luật Hà Nội',
    major: 'Luật Thương mại Quốc tế',
    year: 'Năm 2',
    category: 'Học tập & Ôn thi',
    content: 'Nhiều bạn học Triết hay học vẹt nên điểm thi chỉ lẹt đẹt. Kỳ trước mình thử một cách mới: Sau khi học xong 1 quy luật, mình viết một đoạn áp dụng vào thực tế đời sống sinh viên, rồi nạp vào AI với prompt đóng vai "Thầy dạy Triết 30 năm kinh nghiệm". Thầy AI soi từng chữ: chỗ nào suy diễn bừa, chỗ nào chưa đúng bản chất duy vật biện chứng. Nhờ vậy lúc vào phòng thi mình viết cực kỳ chắc tay và đạt 8.5!',
    promptShared: `Bạn là Giáo sư đầu ngành về Triết học Mác - Lênin. Tôi sẽ trình bày cách hiểu của mình về [Tên Quy luật/Phạm trù] áp dụng vào tình huống [Tình huống].
Hãy chỉ ra:
1. Những điểm tôi đã hiểu đúng.
2. Những sai lầm về mặt phương pháp luận mà sinh viên hay mắc phải trong lập luận trên.
3. Đặt cho tôi 2 câu hỏi vấn đáp hóc búa để tôi tự kiểm tra lại nhận thức.`,
    tags: ['Triết học', 'Ôn thi cuối kỳ', 'Prompt hay', 'Luật'],
    upvotes: 112,
    comments: [
      {
        id: 'c-3',
        authorName: 'Hoàng Văn Bách',
        university: 'Học viện Ngoại giao',
        timestamp: 'Hôm qua',
        content: 'Áp dụng được cho cả môn Lịch sử Đảng và Kinh tế Chính trị không bạn ơi?'
      }
    ]
  },
  {
    id: 'post-3',
    title: 'Kinh nghiệm dùng AI phân tích báo cáo tài chính 100 trang khi đi thực tập phân tích dữ liệu',
    authorName: 'Phạm Đức Long',
    university: 'Đại học Ngoại Thương',
    major: 'Tài chính - Ngân hàng',
    year: 'Năm 4',
    category: 'Kỹ năng đi làm',
    content: 'Tuần đầu tiên đi thực tập ở công ty chứng khoán, sếp giao cho mình 5 bản báo cáo tài chính thường niên để so sánh các chỉ số ROE, P/E và dòng tiền. Thay vì ngồi nhập liệu Excel thủ công cả tuần, mình dùng Gemini 2.5 với cửa sổ ngữ cảnh 1 triệu token. Nạp cùng lúc cả 5 file PDF, yêu cầu trích xuất bảng số liệu và so sánh xu hướng biên lợi nhuận. Sếp khen hết lời và cho mình tham gia trực tiếp vào dự án lớn của phòng!',
    tags: ['Thực tập', 'Tài chính', 'Gemini', 'Báo cáo'],
    upvotes: 67,
    comments: []
  },
  {
    id: 'post-4',
    title: 'Giải quyết mâu thuẫn làm việc nhóm: Tự động hóa biên bản họp và chia task bằng AI',
    authorName: 'Trần Bích Phương',
    university: 'Đại học FPT',
    major: 'Thiết kế Đồ họa & UI/UX',
    year: 'Năm 3',
    category: 'Đồ án & Nhóm',
    content: 'Cứ mỗi lần làm đồ án nhóm là lại có bạn bảo "Em tưởng việc này bạn kia làm". Sau đó mình làm nhóm trưởng và áp dụng quy tắc: Bật ghi âm cuộc họp Google Meet -> Chuyển thành text -> Đưa vào AI tóm tắt thành bảng Action Items: Tên người - Deadline - Sản phẩm bàn giao cụ thể. Cuối buổi gửi thẳng vào nhóm chat. Từ đó không ai cãi được nữa, đồ án nộp sớm 3 ngày!',
    tags: ['Làm việc nhóm', 'Năng suất', 'Đồ án môn học'],
    upvotes: 59,
    comments: []
  }
];
