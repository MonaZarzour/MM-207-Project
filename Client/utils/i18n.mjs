// File: Client/utils/i18n.mjs

const dictionary = {
    en: {
        appTitle: "Shared Shopping List App",
        createUser: "Create User",
        email: "Email",
        password: "Password",
        acceptTosPre: "I accept the ",
        acceptTosLink: "Terms of Service",
        createBtn: "Create",
        creating: "Creating...",
        editUser: "Edit User (me)",
        displayName: "Display Name",
        updateBtn: "Update",
        updating: "Updating...",
        deleteAccount: "Delete Account (me)",
        deleteBtn: "Delete my account",
        deleting: "Deleting...",
        myLists: "My Shopping Lists",
        createList: "Create List",
        listName: "List Name",
        viewItems: "View Items",
        add: "Add",
        itemName: "Item Name",
        qty: "Qty",
        bought: "Bought",
        manageList: "Manage List",
        emailToInvite: "Email to Invite",
        role: "Role",
        invite: "Invite",
        admin: "Admin",
        editor: "Editor",
        viewer: "Viewer",
        backToLists: "Back to Lists",
        logIn: "Log In",
        loggingIn: "Logging in...",
        switchToLogin: "Already have an account? Log In",
        switchToSignup: "Don't have an account? Sign Up",
        logout: "Logout",
        accountSettings: "Account Settings",
        noItemsYet: "No items yet",
        members: "Members",
        removeMember: "Remove this member?"
    },
    no: {
        appTitle: "Delt Handleliste App",
        createUser: "Opprett Bruker",
        email: "E-post",
        password: "Passord",
        acceptTosPre: "Jeg aksepterer ",
        acceptTosLink: "Brukervilkår",
        createBtn: "Opprett",
        creating: "Oppretter...",
        editUser: "Rediger Bruker (meg)",
        displayName: "Visningsnavn",
        updateBtn: "Oppdater",
        updating: "Oppdaterer...",
        deleteAccount: "Slett Konto (meg)",
        deleteBtn: "Slett min konto",
        deleting: "Sletter...",
        myLists: "Mine Handlelister",
        createList: "Opprett Liste",
        listName: "Listens navn",
        viewItems: "Vis Varer",
        add: "Legg til",
        itemName: "Varenavn",
        qty: "Antall",
        bought: "Kjøpt",
        manageList: "Administrer Liste",
        emailToInvite: "E-post å invitere",
        role: "Rolle",
        invite: "Inviter",
        admin: "Admin",
        editor: "Redaktør",
        viewer: "Leser",
        backToLists: "Tilbake til lister",
        logIn: "Logg inn",
        loggingIn: "Logger inn...",
        switchToLogin: "Har du allerede en konto? Logg inn",
        switchToSignup: "Har du ikke en konto? Opprett Bruker",
        logout: "Logg ut",
        accountSettings: "Kontoinnstillinger",
        noItemsYet: "Ingen varer ennå",
        members: "Medlemmer",
        removeMember: "Fjerne dette medlemmet?"
    }
};

export const getLang = () => {
    const lang = navigator.language || "en";
    return lang.startsWith("no") || lang.startsWith("nb") || lang.startsWith("nn") ? "no" : "en";
};

export const t = (key) => {
    const lang = getLang();
    return dictionary[lang][key] || key;
};
