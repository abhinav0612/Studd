import * as lucide from 'lucide-react';
const icons = ['BookOpen', 'Search', 'Bell', 'Menu', 'User', 'CheckCircle', 'UserCircle', 'Settings', 'LogOut', 'Home', 'Users', 'MessageSquare', 'Video', 'FileText', 'UserPlus', 'Shield', 'PlusCircle', 'Zap', 'Calendar', 'Clock', 'X', 'Brain', 'Star', 'PlayCircle'];
const missing = icons.filter(i => !(i in lucide));
console.log('MISSING STRINGS:', missing);
