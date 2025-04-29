import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations directly
const resources = {
  en: {
    translation: {
      navbar: {
        home: "Home",
        about: "About",
        services: "Services",
        portfolio: "Portfolio",
        testimonials: "Testimonials",
        contact: "Contact",
        dashboard: "Dashboard",
        login: "Login",
        signup: "Sign Up"
      },
      home: {
        hero: {
          title: "Drive Growth with Digital Excellence",
          subtitle: "Your partner for strategic digital marketing and impactful online presence",
          cta: "Get Started",
          secondary_cta: "Our Services"
        }
      },
      services: {
        title: "Our Services",
        subtitle: "Comprehensive digital solutions to elevate your brand"
      },
      about: {
        title: "About Us",
        subtitle: "Our journey, mission, and the team behind QuickScale"
      },
      contact: {
        title: "Contact Us",
        subtitle: "Get in touch for a free consultation"
      },
      dashboard: {
        title: "Performance Dashboard",
        subtitle: "Track your campaign performance and user engagement metrics"
      }
    }
  },
  hi: {
    translation: {
      navbar: {
        home: "होम",
        about: "हमारे बारे में",
        services: "सेवाएं",
        portfolio: "पोर्टफोलियो",
        testimonials: "प्रशंसापत्र",
        contact: "संपर्क करें",
        dashboard: "डैशबोर्ड",
        login: "लॉगिन",
        signup: "साइन अप"
      },
      home: {
        hero: {
          title: "डिजिटल उत्कृष्टता के साथ विकास को बढ़ावा दें",
          subtitle: "रणनीतिक डिजिटल मार्केटिंग और प्रभावशाली ऑनलाइन उपस्थिति के लिए आपका पार्टनर",
          cta: "शुरू करें",
          secondary_cta: "हमारी सेवाएं"
        }
      },
      services: {
        title: "हमारी सेवाएं",
        subtitle: "आपके ब्रांड को उन्नत करने के लिए व्यापक डिजिटल समाधान"
      },
      about: {
        title: "हमारे बारे में",
        subtitle: "हमारी यात्रा, मिशन और QuickScale के पीछे की टीम"
      },
      contact: {
        title: "संपर्क करें",
        subtitle: "निःशुल्क परामर्श के लिए संपर्क करें"
      },
      dashboard: {
        title: "प्रदर्शन डैशबोर्ड",
        subtitle: "अपने अभियान के प्रदर्शन और उपयोगकर्ता जुड़ाव मेट्रिक्स का अनुसरण करें"
      }
    }
  },
  zh: {
    translation: {
      navbar: {
        home: "首页",
        about: "关于我们",
        services: "服务",
        portfolio: "作品集",
        testimonials: "客户见证",
        contact: "联系我们",
        dashboard: "数据分析",
        login: "登录",
        signup: "注册"
      },
      home: {
        hero: {
          title: "数字卓越驱动增长",
          subtitle: "您的战略数字营销和有影响力的在线形象合作伙伴",
          cta: "开始使用",
          secondary_cta: "我们的服务"
        }
      },
      services: {
        title: "我们的服务",
        subtitle: "全面的数字解决方案，提升您的品牌"
      },
      about: {
        title: "关于我们",
        subtitle: "我们的旅程、使命以及QuickScale背后的团队"
      },
      contact: {
        title: "联系我们",
        subtitle: "获取免费咨询"
      },
      dashboard: {
        title: "绩效仪表盘",
        subtitle: "跟踪您的营销活动绩效和用户互动指标"
      }
    }
  }
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;