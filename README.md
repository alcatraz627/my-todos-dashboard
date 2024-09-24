# Todo Dashboard

## Screens
1. Day View
2. Calendar Overview
3. Tasks
4. Notes
5. (Preferences)

### 1. Day View
- Show pending tasks for today
- Track daily metrics (weight, wake up time, etc)
- Easily move todos to future dates
- Show habits -> Allow tracking habit use

### 3. Tasks
- CRUD for Task Items
- Title, Description, Completed, Schedule, Tags
- Tags -  Represent Categories
  - "Starred" quick grouping -> Use Colors
  - Optionally can add desc to Category title
- Options (on right side)
  - Schedule -> TODO
  - Description
  - Tags
  - More
    - Delete
    - Move to?
- Reorder
- Completed to be shown at the bottom
> Sort, Search, and Filter

---

## Commands

Prisma Setup
- `npx prisma generate` - Generate Prisma Client
- `npx prisma db push` - Push db changes to vercel
- `npx prisma db seed` - Seed db
- `npx prisma migrate dev` - Generate migrations for "dev" mode
