import React from 'react'
import { SvgIcon } from '@sharedComponents/SvgIcon'
import { type SvgIconProps } from '@mui/material'

const ShipmentIcon: React.FC = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} data-testid={'ShipmentIcon'}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-51, -309)" stroke="#677787" strokeWidth="1.5">
          <g transform="translate(52, 310)">
            <g transform="translate(0.1909, 0)">
              <path
                d="M18.3090909,13.5550434 L18.3090909,0.8109855 C18.3090909,0.427075565 17.9978704,0.115855071 17.6139605,0.115855071 L4.49090909,0.115855071 L4.49090909,0.115855071"
                id="Line-5"
                strokeLinecap="round"
              ></path>
              <line
                x1="0"
                y1="4.63420286"
                x2="4.26060606"
                y2="0.115855071"
                id="Line-4"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></line>
              <line
                x1="13.8090909"
                y1="18.5"
                x2="18.3090909"
                y2="13.75"
                id="Line-4-Copy"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></line>
              <line
                x1="13.8181818"
                y1="4.63420286"
                x2="18.0787879"
                y2="0.115855071"
                id="Line-4-Copy-2"
              ></line>
            </g>
            <path
              d="M5.71818182,4.865913 L8.94242424,4.865913 L8.94242424,8.34156514 L7.40865744,7.79044448 C7.35800649,7.77224433 7.30259957,7.77224433 7.25194862,7.79044448 L5.71818182,8.34156514 L5.71818182,8.34156514 L5.71818182,4.865913 Z"
              id="Rectangle"
            ></path>
            <polygon
              id="Rectangle-Copy-4"
              points="9.24358974 0.487179487 12.4102564 0.487179487 8.94242424 4.40249271 5.71818182 4.40249271"
            ></polygon>
            <path
              d="M0.5,4.5 L13.5,4.5 C13.7761424,4.5 14,4.72385763 14,5 L14,18.35 C14,18.4328427 13.9328427,18.5 13.85,18.5 L0.5,18.5 C0.223857625,18.5 1.69088438e-17,18.2761424 0,18 L0,5 C-3.38176876e-17,4.72385763 0.223857625,4.5 0.5,4.5 Z"
              id="Rectangle"
            ></path>
          </g>
        </g>
      </g>
    </SvgIcon>
  )
}

export default ShipmentIcon
