import { type Theme } from '@mui/material'
import { MuiTabs } from './Tabs'
import { MuiDrawer } from './Drawer'
import { MuiPaper } from './Paper'
import { MuiListItemAvatar, MuiListItemIcon, MuiListItemText } from './List'
import { MuiDivider } from './Divider'
import MuiButton from './Buttons'
import { MuiTableCell, MuiTableContainer, MuiTablePagination, MuiTableRow } from './Table'
import { MuiAccordion } from './Accordion'

export const components: Partial<Theme['components']> = {
  MuiButton: MuiButton(),
  MuiTabs,
  MuiDrawer,
  MuiPaper,
  MuiListItemText,
  MuiListItemIcon,
  MuiListItemAvatar,
  MuiDivider,
  MuiTableCell,
  MuiTableContainer,
  MuiTablePagination,
  MuiTableRow,
  MuiAccordion
}
