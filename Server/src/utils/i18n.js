// File: server/src/utils/i18n.js

const translations = {
    en: {
        "email and password are required": "Email and password are required",
        "You must accept the Terms of Service": "You must accept the Terms of Service",
        "displayName is required": "Display Name is required",
        "User not found": "User not found",
        "Unauthorized": "Unauthorized",
        "Invalid credentials": "Email or password is incorrect",
        "Server error": "An internal server error occurred",
        "Access denied": "Access denied",
        "Only admins can invite members": "Only admins can invite members",
        "User with that email not found": "User with that email not found",
        "title is required": "Title is required",
        "name is required": "Name is required",
        "Invalid role": "Invalid role",
        "Not a member of this list": "Not a member of this list"
    },
    no: {
        "email and password are required": "E-post og passord er påkrevd",
        "You must accept the Terms of Service": "Du må akseptere brukervilkårene",
        "displayName is required": "Visningsnavn er påkrevd",
        "User not found": "Brukeren ble ikke funnet",
        "Unauthorized": "Uautorisert",
        "Invalid credentials": "Feil e-post eller passord",
        "Server error": "Det oppstod en intern serverfeil",
        "Access denied": "Ingen tilgang",
        "Only admins can invite members": "Bare administratorer kan invitere medlemmer",
        "User with that email not found": "Brukeren med den e-posten ble ikke funnet",
        "title is required": "Tittel er påkrevd",
        "name is required": "Navn er påkrevd",
        "Invalid role": "Ugyldig rolle",
        "Not a member of this list": "Ikke medlem av denne listen"
    }
};

export const t = (req, message) => {
    const langs = req.acceptsLanguages() || ["en"];
    const lang = langs.find((l) => l.startsWith("no") || l.startsWith("nb") || l.startsWith("nn")) ? "no" : "en";

    if (translations[lang] && translations[lang][message]) {
        return translations[lang][message];
    }

    return translations["en"][message] || message;
};
