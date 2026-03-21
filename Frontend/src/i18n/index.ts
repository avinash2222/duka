import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      appTitle: "DUKA Login",
      checkingServiceability: "Checking service area...",
      permissionTitle: "Location needed",
      permissionMessage:
        "Please allow location access to check if service is available in your area.",
      outsideTitle: "Service not available yet",
      outsideMessage: "We are coming soon to your area.",
      outsideDistanceLabel: "Your current distance",
      outsideHelpText:
        "You can still check again anytime. As soon as service starts in your area, you can continue instantly.",
      enquiryTitle: "Need help? Send us an enquiry",
      enquirySubtitle: "Tell us anything you need. Our team will reach out.",
      enquiryLabel: "Your message",
      enquiryPlaceholder: "Example: Please start service in my area soon.",
      enquiryButton: "Submit enquiry",
      enquirySubmitting: "Submitting...",
      enquirySuccess: "Thank you. We received your enquiry.",
      enquiryError: "Something went wrong. Please try again.",
      retry: "Retry",
      eligibleTitle: "Service available",
      eligibleMessage: "You can place same-day orders in your area.",
      mobileLabel: "Mobile number",
      mobilePlaceholder: "Enter mobile number",
      continue: "Continue",
      invalidMobile: "Please enter a valid mobile number.",
    },
  },
  hi: {
    translation: {
      appTitle: "DUKA लॉगिन",
      checkingServiceability: "सेवा क्षेत्र जांचा जा रहा है...",
      permissionTitle: "लोकेशन की आवश्यकता है",
      permissionMessage:
        "कृपया लोकेशन की अनुमति दें ताकि हम आपके क्षेत्र में सेवा की उपलब्धता जांच सकें।",
      outsideTitle: "सेवा अभी उपलब्ध नहीं है",
      outsideMessage: "हम आपके क्षेत्र में जल्द आ रहे हैं।",
      outsideDistanceLabel: "आपकी वर्तमान दूरी",
      outsideHelpText:
        "आप कभी भी दोबारा जांच सकते हैं। आपके क्षेत्र में सेवा शुरू होते ही आप तुरंत आगे बढ़ सकेंगे।",
      enquiryTitle: "मदद चाहिए? अपनी पूछताछ भेजें",
      enquirySubtitle: "आप जो भी चाहें लिखें। हमारी टीम आपसे संपर्क करेगी।",
      enquiryLabel: "आपका संदेश",
      enquiryPlaceholder: "उदाहरण: कृपया मेरे क्षेत्र में सेवा जल्दी शुरू करें।",
      enquiryButton: "पूछताछ भेजें",
      enquirySubmitting: "भेजा जा रहा है...",
      enquirySuccess: "धन्यवाद। आपकी पूछताछ हमें मिल गई है।",
      enquiryError: "कुछ गलत हुआ। कृपया फिर से प्रयास करें।",
      retry: "फिर से जांचें",
      eligibleTitle: "सेवा उपलब्ध है",
      eligibleMessage: "आप अपने क्षेत्र में उसी दिन ऑर्डर कर सकते हैं।",
      mobileLabel: "मोबाइल नंबर",
      mobilePlaceholder: "मोबाइल नंबर दर्ज करें",
      continue: "आगे बढ़ें",
      invalidMobile: "कृपया सही मोबाइल नंबर दर्ज करें।",
    },
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
} else {
  // Ensure newly added keys are available during fast refresh.
  i18n.addResourceBundle("en", "translation", resources.en.translation, true, true);
  i18n.addResourceBundle("hi", "translation", resources.hi.translation, true, true);
}

export { i18n };

