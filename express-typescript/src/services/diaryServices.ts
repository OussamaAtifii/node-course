import { DiaryEntry, NonSensetiveInfoDiaryEntry, newDiaryEntry } from '../types'
import diaryData from './diaries.json'

const diaries: DiaryEntry[] = diaryData as Array<DiaryEntry>

export const getEntries = (): DiaryEntry[] => diaries

export const findById = (id: number): NonSensetiveInfoDiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id)

  if (entry) {
    const { comment, ...restOfDiary } = entry
    return restOfDiary
  }

  return undefined
}

export const getEntriesWithoutSensitiveInfo = (): NonSensetiveInfoDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => {
    return {
      id,
      date,
      weather,
      visibility
    }
  })
}

export const addDiary = (newDiaryEntry: newDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...newDiaryEntry
  }

  diaries.push(newDiary)
  return newDiary
}