/**
 * 랜딩 페이지 카피 · 통계 · 링크
 *
 * - 문구와 숫자는 이 파일에서만 수정하면 돼요.
 * - 제목에서 `**강조할 말**` 로 감싼 부분은 로즈핑크로 표시돼요.
 * - 이미지 경로(src)에 파일이 없으면 회색 플레이스홀더가 보여요.
 *   public 폴더에 같은 이름으로 파일을 넣으면 자동으로 바뀌어요.
 */

export type SectionHeadingContent = {
  label: string;
  title: [string, string];
  description?: string;
};

export type LinkContent = { label: string; href: string };

export type ImageContent = { src: string; alt: string };

/* 1. 히어로 ------------------------------------------------------------ */

export const hero = {
  label: "AI PERSONAL STYLING",
  title: ["새로 사기 전에,", "**이미 가진 옷부터.**"] as [string, string],
  description:
    "내 옷장 속 옷으로 되고 싶은 스타일을 먼저 완성하고, 정말 필요한 옷만 사게 도와드려요.",
  primaryCta: { label: "무료로 시작하기", href: "/signup" } as LinkContent,
  secondaryCta: { label: "소개 영상 보기", href: "#video" } as LinkContent,
  phone: {
    src: "/images/app/hero-screen.png",
    alt: "STYLESEED 앱에서 내 옷으로 만든 코디 추천 화면",
  } as ImageContent,
  /** 목업 주변에 떠 있는 옷 카드 (앞의 2개는 모바일에서도 보여요) */
  floatingItems: [
    {
      name: "울 블레이저",
      tag: "Burgundy · Wool",
      image: { src: "/images/closet/blazer.png", alt: "버건디 울 블레이저" },
    },
    {
      name: "니트 가디건",
      tag: "Olive · Knit",
      image: { src: "/images/closet/cardigan.png", alt: "올리브 니트 가디건" },
    },
    {
      name: "코튼 셔츠",
      tag: "White · Cotton",
      image: { src: "/images/closet/shirt.png", alt: "화이트 코튼 셔츠" },
    },
    {
      name: "레더 로퍼",
      tag: "Black · Leather",
      image: { src: "/images/closet/loafer.png", alt: "블랙 레더 로퍼" },
    },
  ],
};

/* 2. 문제 공감 ---------------------------------------------------------- */

export const paradox = {
  heading: {
    label: "STYLESEED · CLOSET PARADOX",
    title: ["옷장은 가득 찼는데,", "**입지 않는 옷**이 쌓여요"],
  } satisfies SectionHeadingContent,
  stats: [
    {
      value: 22,
      suffix: "%",
      title: "1년간 한 번도 입지 않은 옷",
      meta: "평균 198벌 보유",
      source: "벨기에 플랑드르 성인 156명 옷장 조사, 2024",
    },
    {
      value: 26,
      suffix: "%",
      title: "최근 1년간 입지 않은 옷",
      meta: "평균 118벌 보유",
      source: "영국 WRAP 조사",
    },
  ],
  quote: {
    text: "“앞으로 입을 것 같아서”",
    body: "버리지 못하는 이유예요. 입을 의지는 있지만, **언제·어떻게 입을지** 연결되지 않았을 뿐이에요.",
  },
};

/* 3. 인사이트 ----------------------------------------------------------- */

export const insight = {
  heading: {
    label: "STYLESEED · IDEAL FASHION SELF",
    title: ["재킷을 찾는 게 아니라,", "**되고 싶은 나**를 찾고 있어요"],
    description:
      "사람들은 '지금의 나'보다 '되고 싶은 나'에 맞춰 옷을 골라요. STYLESEED는 그 스타일을 내 옷장에서 먼저 찾아요.",
  } satisfies SectionHeadingContent,
  /** 배경에서 천천히 움직이는 큰 글자 (장식용) */
  backgroundWord: "IDEAL SELF",
  cores: [
    {
      name: "POETCORE",
      mood: "문학적인 · 빈티지 · 따뜻한 무드",
      colors: "버건디·올리브",
      materials: "울·니트",
      items: "블레이저·셔츠·로퍼",
      swatches: ["#6e2233", "#6b6a3a"],
      image: { src: "/images/cores/poetcore.jpg", alt: "포엣코어 무드 코디" },
    },
    {
      name: "MINIMAL",
      mood: "절제된 · 깔끔한 · 정돈된 무드",
      colors: "블랙·화이트·베이지",
      materials: "코튼·울",
      items: "슬랙스·셔츠·코트",
      swatches: ["#141414", "#ffffff", "#d8cbb3"],
      image: { src: "/images/cores/minimal.jpg", alt: "미니멀 무드 코디" },
    },
    {
      name: "ROMANTIC",
      mood: "부드러운 · 여성스러운 무드",
      colors: "아이보리·핑크",
      materials: "레이스·쉬폰",
      items: "블라우스·스커트",
      swatches: ["#f5efe1", "#e8b4c2"],
      image: { src: "/images/cores/romantic.jpg", alt: "로맨틱 무드 코디" },
    },
    {
      name: "GRUNGE",
      mood: "자유로운 · 거친 무드",
      colors: "차콜·카키",
      materials: "데님·레더",
      items: "체크셔츠·부츠",
      swatches: ["#3a3a3a", "#5f5d43"],
      image: { src: "/images/cores/grunge.jpg", alt: "그런지 무드 코디" },
    },
  ],
  source: "출처: Pinterest 2026 트렌드 · 'poet core' 검색 전년 대비 75% 증가",
};

/* 4. 작동 방식 ---------------------------------------------------------- */

export type HowStep = {
  title: string;
  description: string;
  tags?: string[];
  gauge?: { value: number; label: string };
};

export const how = {
  heading: {
    label: "STYLESEED · HOW IT WORKS",
    title: ["분석하고, 평가하고,", "**내 옷으로 추천해요**"],
  } satisfies SectionHeadingContent,
  steps: [
    {
      title: "사진 한 장이면 등록 끝",
      description:
        "AI가 카테고리·색상·핏·소재·계절·TPO·스타일을 분석해요. 틀린 값만 고치면 돼요.",
      tags: ["카테고리", "색상", "핏", "소재", "계절", "TPO", "스타일"],
    },
    {
      title: "의상학 기준으로 조합 평가",
      description:
        "Color, Fit·Silhouette, Material, Season, TPO를 점수로 계산해요.",
      tags: ["Color", "Fit·Silhouette", "Material", "Season", "TPO"],
    },
    {
      title: "Match Score와 추천 이유",
      description: "왜 이 코디인지 근거까지 보여드려요.",
      gauge: { value: 75, label: "Match Score" },
    },
    {
      title: "정말 없을 때만 상품 연결",
      description: "옷장에 부족한 아이템만 찾아서 추천해요.",
    },
  ] satisfies HowStep[],
};

/* 5. 핵심 기능 ---------------------------------------------------------- */

export const features = {
  heading: {
    label: "STYLESEED · FEATURES",
    title: ["매일 옷장을 여는", "**새로운 방법**"],
  } satisfies SectionHeadingContent,
  items: [
    {
      title: "Digital Closet",
      description:
        "내 옷을 한눈에. 소수의 옷만 등록해도 첫 코디를 바로 받아요.",
    },
    {
      title: "Core 코디",
      description: "되고 싶은 스타일을 고르면 내 옷으로 그 무드를 완성해요.",
    },
    {
      title: "오늘의 코디",
      description:
        "오늘 날씨에 맞춰 지금 바로 입을 수 있는 코디를 알려줘요.",
    },
    {
      title: "Missing Item",
      description: "원하는 스타일에 정말 부족한 아이템만 알려줘요.",
    },
    {
      title: "살까 말까 판단",
      description:
        "“내 옷 42벌 중 15벌과 조합 가능, 새 코디 12개, 비슷한 옷 1개 보유”처럼 사기 전에 확인해요.",
      highlight: true,
    },
  ],
};

/* 6. 차별점 비교 -------------------------------------------------------- */

export const comparison = {
  heading: {
    label: "STYLESEED · STARTING POINT",
    title: ["무엇을 살까?가 아니라,", "**내가 가진 옷으로 무엇을 입을까?**"],
  } satisfies SectionHeadingContent,
  current: {
    eyebrow: "지금의 방식",
    title: "옷장 밖에서 답을 찾아요",
    items: [
      { action: "익숙한 코디 반복", result: "가진 옷의 조합을 다 쓰지 못해요" },
      { action: "SNS 검색", result: "남의 옷장 기준이라 내 옷과 연결되지 않아요" },
      { action: "새 옷 구매", result: "옷만 늘고 고민은 그대로예요" },
    ],
  },
  styleseed: {
    eyebrow: "STYLESEED",
    title: "내 옷장에서 시작해요",
    items: [
      { label: "ANALYSIS", description: "옷 사진을 속성 데이터로" },
      { label: "EVALUATION", description: "의상학 지표로 조합 평가" },
      { label: "IDEAL STYLE", description: "되고 싶은 스타일도 내 옷으로" },
    ],
    closing: "새로 사기 전에, **이미 가진 옷**부터.",
  },
};

/* 7. 요금제 ------------------------------------------------------------- */

export type BillingCycle = "monthly" | "yearly";

export const pricing = {
  heading: {
    label: "STYLESEED · PRICING",
    title: ["옷장 저장이 아니라,", "**더 나은 코디와 구매 판단**에"],
  } satisfies SectionHeadingContent,
  cycleLabels: { monthly: "월간", yearly: "연간" } as Record<BillingCycle, string>,
  free: {
    name: "Free",
    price: "0원",
    features: [
      "옷 등록 · AI 분석",
      "Digital Closet",
      "보유 의류 기반 기본 코디",
      "Missing Item 탐지",
    ],
    cta: { label: "무료로 시작하기", href: "/signup" } as LinkContent,
  },
  plus: {
    name: "PLUS",
    prices: {
      monthly: { amount: "5,900원", unit: "월" },
      yearly: { amount: "59,000원", unit: "년" },
    } as Record<BillingCycle, { amount: string; unit: string }>,
    features: [
      "Free의 모든 기능",
      "내 취향을 학습하는 개인화 추천",
      "살까 말까 판단 (Wardrobe Decision)",
      "Ideal Style 분석",
      "트렌드 코디",
    ],
    cta: { label: "PLUS 시작하기", href: "/signup" } as LinkContent,
    note: "초기 가격이며 변경될 수 있어요",
  },
};

/* 8. 신뢰 요소 ---------------------------------------------------------- */

export const userTest = {
  heading: {
    label: "STYLESEED · USER TEST",
    title: ["먼저 써본 사람들이", "**이렇게 말했어요**"],
  } satisfies SectionHeadingContent,
  metrics: [
    { value: 87, suffix: "%", label: "첫 코디 생성 완료" },
    { value: 73, suffix: "%", label: "추천 코디 저장" },
    { value: 67, suffix: "%", label: "오늘의 코디 재사용 의향" },
    { value: 80, suffix: "%", label: "서비스가 도움이 된다" },
  ],
  method: "2026.08.25~09.05 · 20~34세 여성 15명 · 음성 인터뷰 + 설문",
  partners:
    "여성복 브랜드 2곳 · 주얼리 브랜드 1곳과 상품 연동 협력을 논의하고 있어요",
};

/* 9. 만든 사람 · 소개 영상 ---------------------------------------------- */

export const maker = {
  heading: {
    label: "STYLESEED · MAKERS",
    title: ["옷을 공부한 사람이", "**직접 만들었어요**"],
  } satisfies SectionHeadingContent,
  paragraphs: [
    "의상학을 전공한 대표가 패션 지식을 추천 기준으로 직접 설계하고, 앱을 직접 만들었어요.",
    "지금은 대표와 팀원 2명이 함께 STYLESEED를 만들고 있어요.",
  ],
  video: {
    title: "STYLESEED 소개 영상",
    embedUrl: "https://www.youtube.com/embed/pwRZ6W0soZ8",
  },
};

/* 10. 마지막 CTA · 푸터 ------------------------------------------------- */

export const finalCta = {
  label: "STYLESEED · START",
  title: ["오늘은 옷장부터", "**다시 열어볼까요?**"] as [string, string],
  cta: { label: "무료로 시작하기", href: "/signup" } as LinkContent,
};

export const footer = {
  tagline: "AI PERSONAL STYLING",
  contactLabel: "문의",
  copyright: "© 2026 STYLESEED",
};
