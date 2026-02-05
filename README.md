# Heavenly Path Cultivation Discord Bot

Advanced modular Discord bot with:
- Slash commands (one command per file)
- **500 major realms**: 5 major bands × 100 realms each (not counting stages)
- Major bands are ordered as: Mortal → Immortal → Heavenly → Divine → Grand Divine
- Every major realm has **9 stages (I-IX)**
- Mortal major realms include classic cultivation names: **Foundation Establishment**, **Core Formation**, **Nascent Soul**, etc.
- Randomized races, spiritual roots, and cultivation talents
- 6 rarities with **120 entries each per rarity** for races, roots, and talents (**720 entries per category**)
- Rarity itself is randomized (best traits roll in godlike, weakest in common)
- PvE, PvP, route system, sect creation/war/upgrades
- Advanced `/profile` SVG card rendering

## Setup
```bash
npm install
# Create .env and add DISCORD_TOKEN=your_token_here
npm start
```

## Commands
- `/start`
- `/name`
- `/profile`
- `/route`
- `/meditate`
- `/breakthrough`
- `/hunt`
- `/kill`
- `/sect`
- `/help`

## Notes
- Trait assignment is fully randomized when `/start` is used.
- Name is manually editable through `/name`.
