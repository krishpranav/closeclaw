# ⊗ CloseClaw

> A premium mobile interface for the OpenClaw penetration testing framework — built for speed, built for operators.

![Version](https://img.shields.io/badge/version-1.0.0--alpha-C8FF00?style=flat-square&labelColor=111111)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-00D4FF?style=flat-square&labelColor=111111)
![Framework](https://img.shields.io/badge/framework-React%20Native%20%2B%20Expo-FF3A5E?style=flat-square&labelColor=111111)
![License](https://img.shields.io/badge/license-MIT-C8FF00?style=flat-square&labelColor=111111)

---

## What is CloseClaw?

CloseClaw is a mobile-first wrapper around the **OpenClaw CLI** — a Metasploit-compatible penetration testing toolkit. Instead of staring at a terminal, operators get a tactile, high-performance mobile experience designed to be used in the field.

The UI is inspired by the **CRED design language** — deep blacks, neon accents, glassmorphism cards, and haptic feedback that makes every interaction feel intentional. No clutter. No wasted space. Just the tools you need, exactly when you need them.

> **This is a research and authorized-use tool only.** CloseClaw is intended strictly for security professionals conducting authorized penetration tests or CTF exercises. Unauthorized use against systems you do not own or have explicit permission to test is illegal.

---

## Screenshots

> soon

---

## Features

### Dashboard
- At-a-glance stats: discovered hosts, active sessions, at-risk targets
- Quick-action cards for all core operations
- Live console output with timestamped log stream
- Global **Command Palette** (`⌕ CMD`) for keyboard-style navigation

### Network Discovery (Scan)
- CIDR range input with start/stop scan control
- Real-time host list with open ports, CVE tags, OS detection
- Risk-level badges: Low → Medium → High → Critical
- Built with `FlashList` for 60fps scroll performance

### Exploit Modules
- Full exploit library ranked by reliability (Excellent → Low)
- One-tap "run against target" modal with session auto-creation
- CVE reference, platform compatibility, and last-used metadata

### Sessions
- Active session management (Shell, Meterpreter)
- Per-session controls: Shell, File Browser, Upload
- Swipe-to-close with confirmation dialog

### Settings
- Workspace name configuration
- Auto-scan on launch toggle
- Verbose logging toggle
- Framework mode display (Mock / Live RPC)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native (Expo) + TypeScript |
| Styling | NativeWind v4 (Tailwind CSS) |
| State | Zustand |
| Lists | `@shopify/flash-list` |
| Animation | `react-native-reanimated` |
| Haptics | `expo-haptics` |
| Navigation | React Navigation (Bottom Tabs + Stack) |
| Gradients | `expo-linear-gradient` |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator, or the **Expo Go** app on a physical device

### Installation

```bash
git clone https://github.com/krishpranav/closeclaw.git
cd closeclaw

npm install

npx expo start
```

Press `i` for iOS Simulator, `a` for Android Emulator, or scan the QR code with Expo Go.

---

## Roadmap

- [ ] Live MSF RPC integration (replace mock store with real HTTP/WS calls)
- [ ] Meterpreter shell terminal (interactive PTY in-app)
- [ ] File browser for active sessions
- [ ] Payload builder UI (LHOST, LPORT, encoder selection)
- [ ] Scan profile presets (Quick / Full / Stealth)
- [ ] Push notifications for new session events
- [ ] Report export (PDF/JSON) for findings
- [ ] Biometric lock screen

---

## Security Notice

CloseClaw is a **professional security research tool**.

- Only use against systems you own or have **written authorization** to test.
- The authors are not responsible for misuse.
- This tool does not phone home, collect telemetry, or transmit any data.
- All scan/exploit operations in the current release run in **mock mode** — no actual network traffic is generated until the MSF RPC backend is connected.

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

MIT © 2025 CloseClaw Contributors

---

<div align="center">
  <strong>Built for operators. Designed without compromise.</strong>
  <br/>
  <code>⊗ CloseClaw</code>
</div>