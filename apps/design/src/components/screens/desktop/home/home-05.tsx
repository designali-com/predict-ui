import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"

import { DesktopScreen } from "../desktop-screen"
import { BottomGlow, DashCard, DashCardHeader, DateStrip, HomeHeader, MetricRow } from "./shared"
import {
  AvatarStack,
  BigStat,
  ChatRow,
  HomeNav,
  PanelCard,
  PhotoAvatar,
  RangeBars,
  RowTitle,
  Unit,
} from "./shared-c"

// Kept local: a plain value imported from a "use client" module is a client
// reference in this server component, not the string.
const ASSETS = "/screens/desktop/home"

export const title = "Family"

const chatPhotos = {
  santosh: { src: `${ASSETS}/home-05-chat-avatar-1.png`, alt: "Santosh" },
  meera: { src: `${ASSETS}/home-05-chat-avatar-2.png`, alt: "Meera" },
  ankit: { src: `${ASSETS}/home-05-chat-avatar-3.png`, alt: "Ankit" },
}

const members = [
  { name: "Arjun Vaidya", role: "You", photo: `${ASSETS}/home-05-member-1.png`, left: "left-[479px]" },
  { name: "Priya Vaidya", role: "Mother", photo: `${ASSETS}/home-05-member-2.png`, left: "left-[810px]" },
  { name: "Suresh Vaidya", role: "Father", photo: `${ASSETS}/home-05-member-1.png`, left: "left-[1140px]" },
]

function MemberCard({ name, role, photo, className }: { name: string; role: string; photo: string; className?: string }) {
  return (
    <DashCard className={`top-[732px] h-[145px] w-[301px] items-start justify-between gap-0 rounded-[32px] p-6 ${className}`}>
      <div className="flex w-[214px] items-center justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt={name} width={71} height={71} className="size-[71px] shrink-0 rounded-full" />
        <div className="flex w-[143px] flex-col justify-center gap-2.5 px-4">
          <RowTitle className="h-5">{name}</RowTitle>
          <p className="text-base leading-5 whitespace-nowrap">{role}</p>
        </div>
      </div>
      {/* Profile completeness */}
      <div className="relative h-3 w-[218px]">
        <div className="absolute top-[2.54px] left-0 h-[8.92px] w-[222.9px] rounded-full bg-muted/70" />
        <div className="absolute top-[2.54px] left-0 h-[8.92px] w-[186px] rounded-full bg-primary" />
      </div>
    </DashCard>
  )
}

/** Sleep gauge · check-in bar · daily goals ring. */
function TodayStats() {
  return (
    <div className="flex w-[400px] items-center justify-between">
      <div className="relative size-[147.2px] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSETS}/home-05-sleep-gauge.svg`}
          alt=""
          className="absolute top-[-4.58px] left-0 h-[151.78px] w-[147.2px] max-w-none"
        />
        <p className="absolute top-[51.52px] left-[46px] text-[27.6px] leading-[33.12px] font-medium">84%</p>
      </div>

      <div className="relative h-[147px] w-16 shrink-0">
        <div className="absolute top-[0.1px] left-[8.96px] h-[147px] w-[46px] rounded-[14px] bg-secondary" />
        <div className="absolute top-[59.1px] left-[8.96px] h-[88px] w-[46px] rounded-[14px] bg-primary" />
        <p className="absolute top-[117.9px] left-[calc(50%+0.08px)] -translate-x-1/2 text-xl leading-[18.4px] text-primary-foreground">
          67
        </p>
      </div>

      <div className="relative h-[147.2px] w-[145.36px] shrink-0">
        <div className="absolute top-[30.82px] left-1/2 size-[88.32px] -translate-x-1/2 rounded-full bg-secondary shadow-[inset_0_9.2px_18.4px_rgba(255,255,255,0.25)]" />
        <div className="absolute top-[2.3px] left-1/2 size-[145.36px] -translate-x-1/2 rounded-full border-[9.2px] border-dashed border-secondary" />
        <div className="absolute top-[18.86px] left-1/2 size-[112.24px] -translate-x-1/2 rounded-full border-[13.8px] border-secondary" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSETS}/home-05-goals-arc.svg`}
          alt=""
          className="absolute top-[11.96px] left-[9.66px] h-[69.92px] w-[126.04px] max-w-none"
        />
        <p className="absolute top-[59.34px] left-[calc(50%+1.1px)] -translate-x-1/2 text-[33.12px] leading-[18.4px] text-primary">
          25
        </p>
        <p className="absolute top-[80.5px] left-1/2 -translate-x-1/2 text-[11.04px] leading-[18.4px] text-primary">/100</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSETS}/home-05-goals-ticks.svg`}
          alt=""
          className="absolute top-[-2.3px] left-[-4.6px] h-[81.88px] w-[154.56px] max-w-none"
        />
      </div>
    </div>
  )
}

// Figma: Slide 16:9 - 22 (1855:1769)
export default function HomeDesktop05() {
  return (
    <DesktopScreen>
      <BottomGlow />

      <HomeHeader />
      <DateStrip />

      {/* My family (blood report summary) */}
      <PanelCard className="top-[398px] left-[47px] h-[479px] w-[401px]">
        <DashCardHeader title="My family" description="Apollo Diagnostics · 12 Nov" link />
        <div className="flex flex-col gap-6">
          <BigStat value="58" caption="of 61 in range" width={99} />
          <RangeBars filled={16} />
        </div>
        <MetricRow title="Vitamin D" description="Below range · 30–100" value={<Unit value="18" unit="ng/mL" />} />
        <MetricRow title="hs-CRP" description="Above range · under 3" value={<Unit value="3.4" unit="mg/L" />} />
        <MetricRow title="HbA1c" description="Above range · under 5.7" value="5.9%" />
      </PanelCard>

      {/* Today: check-in alert */}
      <PanelCard className="top-[398px] left-[498px] h-[304px] w-[462px] items-start">
        <DashCardHeader title="Today" link />
        <div className="flex w-full flex-col gap-3">
          <p className="w-[401px] text-4xl leading-10">Meera hasn&apos;t replied to today&apos;s check-in.</p>
          <p className="w-[341px] text-base leading-6">She asked us to notify you if she hasn’t replied by 11:00 am.</p>
          <div className="flex items-center gap-1.5">
            <Button variant="secondary" size="lg" className="w-[125px] px-6 text-sm">
              Call Meera
            </Button>
            <Button variant="secondary" size="lg" className="w-[124px] px-6 text-sm">
              Message
            </Button>
          </div>
        </div>
      </PanelCard>

      {/* Today: stats */}
      <PanelCard className="top-[398px] left-[967px] h-[304px] w-[474px]">
        <DashCardHeader title="Today" link />
        <TodayStats />
        <p className="w-full text-center text-sm leading-6">Today: no reply yet. It went out at 8:00 am.</p>
      </PanelCard>

      {members.map((m) => (
        <MemberCard key={m.left} name={m.name} role={m.role} photo={m.photo} className={m.left} />
      ))}

      {/* My chats */}
      <PanelCard className="top-[398px] left-[1472px] h-[479px] w-[399px]">
        <DashCardHeader title="My chats" link />
        <ChatRow
          name="My family"
          time="9:30 PM"
          avatar={<AvatarStack photos={[chatPhotos.santosh, chatPhotos.meera, chatPhotos.ankit]} more={2} />}
        />
        <ChatRow name="Santosh" time="Yesterday" avatar={<PhotoAvatar {...chatPhotos.santosh} />} />
        <ChatRow name="Meera" time="Monday" avatar={<PhotoAvatar {...chatPhotos.meera} />} />
        <ChatRow name="Ankit" time="Monday" avatar={<PhotoAvatar {...chatPhotos.meera} />} />
        <ChatRow name="Rahul" time="Monday" avatar={<PhotoAvatar {...chatPhotos.meera} />} />
      </PanelCard>

      <HomeNav defaultTab="people" tone="primary" highlight="assistant" />
    </DesktopScreen>
  )
}
