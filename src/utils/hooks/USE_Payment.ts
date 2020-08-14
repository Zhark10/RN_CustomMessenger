import React, { useState } from 'react'

import { TUseChatMiddleware, EBubbleType } from './USE_ChatMiddleware'
import { IDate } from '../../components/shared/picker/T_DatePicker'
import { IBankAccount, IPaymentCard } from '../../types'

const useCreditCard = (
  chatMiddleware: TUseChatMiddleware,
  endFunc: (data: IPaymentCard, cb: any) => void,
  onHidePanel: () => void,
) => {
  const [creditErrors, refreshCreditErrors] = useState<any>({})

  const [cardNumber, setCardNumber] = React.useState('')
  const [cvc, setCvc] = React.useState('')
  const [name, setName] = React.useState('')
  const [expirationMonth, setExpirationMonth] = React.useState('01')
  const [expirationYear, setExpirationYear] = React.useState('1910')

  const saveDate = ({ month, year }: IDate) => {
    setExpirationMonth(month)
    setExpirationYear(year)
  }

  const saveCardNumber = (text: React.SetStateAction<string>) => {
    if (creditErrors.cardNumber) {
      refreshCreditErrors((errors: { [x: string]: any; cardNumber: any }) => {
        const { cardNumber, ...otherErrors } = errors
        return otherErrors
      })
    }
    setCardNumber(text)
  }

  const saveCvc = (text: React.SetStateAction<string>) => {
    if (creditErrors.cvc) {
      refreshCreditErrors((errors: { [x: string]: any; cvc: any }) => {
        const { cvc, ...otherErrors } = errors
        return otherErrors
      })
    }
    setCvc(text)
  }

  const saveName = (text: React.SetStateAction<string>) => {
    refreshCreditErrors((errors: { [x: string]: any; name: any }) => {
      const { name, ...otherErrors } = errors
      return otherErrors
    })
    setName(text)
  }

  const sendCardInfo = React.useCallback(() => {
    const _cardNumber = cardNumber.replace(/[^0-9]/g, '').slice(0, 16)
    const _cvc = cvc.replace(/[^0-9]/g, '').slice(0, 3)
    const _name = name.slice(0, 50)

    if (_cardNumber.length < 16) {
      refreshCreditErrors((currentErrors: any) => ({
        ...currentErrors,
        cardNumber: 'Некорректный номер карты',
      }))
      return null
    }

    if (_name.length < 1) {
      refreshCreditErrors((currentErrors: any) => ({
        ...currentErrors,
        name: 'Поле не может быть пустым',
      }))
      return null
    }

    if (_cvc.length < 3) {
      refreshCreditErrors((currentErrors: any) => ({
        ...currentErrors,
        cvc: 'Код неверный',
      }))
      return null
    }

    onHidePanel()
    endFunc(
      {
        number: _cardNumber,
        cvc: +_cvc,
        expirationMonth: +expirationMonth,
        expirationYear: +expirationYear,
        name: _name,
      },
      chatMiddleware.sendAnswer('Привязал банковскую карту, отправляю', EBubbleType.TEXT),
    )
  }, [cardNumber, chatMiddleware, cvc, endFunc, expirationMonth, expirationYear, name, onHidePanel])

  return {
    saveCardNumber,
    saveCvc,
    saveName,
    saveDate,
    sendCardInfo,
    creditErrors,
    refreshCreditErrors,
  }
}

const useBankAccount = (
  chatMiddleware: TUseChatMiddleware,
  endFunc: (data: IBankAccount, cb: any) => void,
  onHidePanel: () => void,
) => {
  const [bankErrors, refreshBankErrors] = useState<any>({})
  const [accountNumber, setAccountNumber] = React.useState('')
  const [bankNumber, setBankNumber] = React.useState('')

  const saveAccountNumber = (text: React.SetStateAction<string>) => {
    if (bankErrors.accountNumber) {
      refreshBankErrors((errors: { [x: string]: any; accountNumber: any }) => {
        const { accountNumber, ...otherErrors } = errors
        return otherErrors
      })
    }
    setAccountNumber(text)
  }

  const saveBankNumber = (text: React.SetStateAction<string>) => {
    if (bankErrors.bankNumber) {
      refreshBankErrors((errors: { [x: string]: any; bankNumber: any }) => {
        const { bankNumber, ...otherErrors } = errors
        return otherErrors
      })
    }
    setBankNumber(text)
  }

  const sendBankInfo = React.useCallback(() => {
    if (accountNumber.length < 6) {
      refreshBankErrors((currentErrors: any) => ({
        ...currentErrors,
        accountNumber: 'Неверно введен номер',
      }))
      return null
    }

    if (bankNumber.length < 6) {
      refreshBankErrors((currentErrors: any) => ({
        ...currentErrors,
        bankNumber: 'Неверно введен номер',
      }))
      return null
    }

    onHidePanel()
    endFunc(
      {
        number_1: accountNumber,
        number_2: bankNumber,
      },
      chatMiddleware.sendAnswer('Привязал банковский счет, отправляю', EBubbleType.TEXT),
    )
  }, [accountNumber, bankNumber, chatMiddleware, endFunc, onHidePanel])

  return {
    saveAccountNumber,
    saveBankNumber,
    sendBankInfo,
    bankErrors,
    refreshBankErrors,
  }
}

export const USE_PaymentMethod = {
  useBankAccount,
  useCreditCard,
}
