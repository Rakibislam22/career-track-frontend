export const STATUS_OPTIONS = ["SAVED", "APPLIED", "ASSESSMENT", "INTERVIEW", "REJECTED", "OFFER"];
export const SOURCE_OPTIONS = ["LINKEDIN", "BDJOBS", "INDEED", "WELLFOUND", "FACEBOOK", "REFERRAL", "OTHER"];

export const statusBadgeClass = {
    SAVED: "badge-neutral",
    APPLIED: "badge-info",
    ASSESSMENT: "badge-warning",
    INTERVIEW: "badge-warning",
    REJECTED: "badge-error",
    OFFER: "badge-success",
};

export const statusLabel = {
    SAVED: "Saved",
    APPLIED: "Applied",
    ASSESSMENT: "Assessment",
    INTERVIEW: "Interview",
    REJECTED: "Rejected",
    OFFER: "Offer",
};

export const sourceLabel = {
    LINKEDIN: "LinkedIn",
    BDJOBS: "Bdjobs",
    INDEED: "Indeed",
    WELLFOUND: "Wellfound",
    FACEBOOK: "Facebook",
    REFERRAL: "Referral",
    OTHER: "Other",
};

// Shared SweetAlert dark-theme styling — keeps every confirmation popup consistent
export const swalDarkTheme = {
    background: "#171e29",
    color: "#ffffff",
    confirmButtonColor: "#238636",
};
