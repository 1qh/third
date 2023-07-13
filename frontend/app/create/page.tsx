'use client'
import { useStateContext } from '#/context'
import { ethers } from 'ethers'
import { Button, Label, Spinner, TextInput, Textarea } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { HiBriefcase, HiCalendar, HiCurrencyDollar, HiMail, HiPhotograph } from 'react-icons/hi'

export default function Page() {
    let today = new Date()
    const [date, setDate] = useState<Date>(today)
    const onSetDate = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDate(new Date(event.target.value))
    }
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { create } = useStateContext()
    const [form, setForm] = useState({
        name: '',
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: ''
    })
    const checkImage = (url: string, callback: (b: boolean) => void) => {
        const img = new Image()
        img.src = url
        if (img.complete) callback(true)
        img.onload = () => callback(true)
        img.onerror = () => callback(false)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        checkImage(form.image, async exists => {
            if (exists) {
                setIsLoading(true)
                await create({ ...form, target: ethers.utils.parseUnits(form.target, 18) })
                setIsLoading(false)
            } else {
                alert('Inalid image URL')
                setForm({ ...form, image: '' })
            }
        })
    }
    const handleChange = (
        field: string,
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setForm({ ...form, [field]: e.target.value })
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center py-20">
                <div className="px-8 py-5 text-5xl font-bold text-center text-gray-600 bg-white bg-opacity-50 rounded-full shadow-2xl shadow-gray-300 dark:bg-black dark:text-gray-300">
                    Start a Campaign
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex flex-col flex-1">
                        <Label value="Your Name" className="mb-2" />
                        <TextInput
                            type="text"
                            icon={HiMail}
                            placeholder="Huy Lai"
                            required={true}
                            className="min-w-max"
                            onChange={e => handleChange('name', e)}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <Label htmlFor="title" value="Title" className="mb-2" />
                        <TextInput
                            id="title"
                            type="text"
                            icon={HiBriefcase}
                            placeholder="An impressive title"
                            required={true}
                            className="min-w-max"
                            onChange={e => handleChange('title', e)}
                        />
                    </div>
                </div>
                <Label htmlFor="story" value="Story" className="mt-4 mb-2" />
                <Textarea
                    id="story"
                    placeholder="Write your story ..."
                    required={true}
                    rows={5}
                    onChange={e => handleChange('description', e)}
                />
                <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex flex-col flex-1">
                        <Label htmlFor="goal" value="Goal (ETH)" className="mb-2" />
                        <TextInput
                            id="goal"
                            type="number"
                            min={0.0}
                            step="any"
                            icon={HiCurrencyDollar}
                            placeholder="Amount of money you want to raise"
                            required={true}
                            className="min-w-max"
                            onChange={e => handleChange('target', e)}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <Label htmlFor="date" value="End Date" className="mb-2" />
                        <TextInput
                            id="date"
                            type="date"
                            min={new Date().toISOString().slice(0, -8).split('T')[0]}
                            defaultValue={date.toLocaleDateString('en-CA')}
                            icon={HiCalendar}
                            required={true}
                            className="min-w-max"
                            onChange={e => {
                                onSetDate
                                handleChange('deadline', e)
                            }}
                        />
                    </div>
                </div>
                <Label htmlFor="img" value="Campaign image" className="mt-4 mb-2" />
                <TextInput
                    id="img"
                    type="url"
                    icon={HiPhotograph}
                    placeholder="Image URL of your campaign"
                    required={true}
                    onChange={e => handleChange('image', e)}
                />
                <div className="flex flex-col items-center my-12">
                    <Button outline gradientDuoTone="purpleToBlue" type="submit">
                        {isLoading ? (
                            <>
                                <Spinner />
                                <span className="pl-3">Transaction in progress ...</span>
                            </>
                        ) : (
                            <span>Submit Campaign</span>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
