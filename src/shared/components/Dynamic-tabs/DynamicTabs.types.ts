export interface TabInfo {
  label: string
  content: React.ReactNode
}

export interface DynamicTabsProps {
  tabs: TabInfo[]
}
