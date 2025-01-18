'use client'
import React, { useState } from 'react';
import { PlusCircle, X, Edit2, Save, Plus, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserData } from '@/app/interfaces/Auth/User';
import { Bio, Contact, Platform, Skill, Skills } from '@/app/interfaces/PartyList/partylist';
import Image from 'next/image';
import { AddContact, AddExperience, AddSkillInPartyList, RemoveContact, RemoveExperience, RemoveSkill, UpdateBio, UpdateContact, UpdateExperience } from '@/app/functions/PartyList';
import { toast } from 'react-toastify';
import { Response } from '@/app/interfaces/Response';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icon } from '@/app/interfaces/Icon/Icon';

interface FormData {
    bio: Bio;
    contacts: Contact[];
    skills: Skills[]
}


interface NewContact {
    username: string;
    link: string;
    platformId: string;
}

interface NewSkill {
    id: string;
    name: string;
    icon: Icon
}

const SettingProfile = ({ user, platforms, skills }: { user: UserData, platforms: Platform[], skills: Skill[] }) => {
    const [formData, setFormData] = useState<FormData>({
        bio: user.data.partyList.bio,
        contacts: user.data.partyList.contacts,
        skills: user.data.partyList.bio.skills,
    });
    const [isEditingBio, setIsEditingBio] = useState<boolean>(false);
    const [editingExperience, setEditingExperience] = useState<{ id: number; title: string } | null>(null);
    const [newExperience, setNewExperience] = useState<string>('');
    const [editingContact, setEditingContact] = useState<Contact | null>(null);
    const [newContact, setNewContact] = useState<NewContact>({
        username: '',
        link: '',
        platformId: ''
    });
    const [newSkill, setNewSkill] = useState<NewSkill>({
        id: "",
        name: "",
        icon: {
            id: 0,
            name: "",
        }
    });

    const handleUpdateBio = async () => {

        const data = {
            shortMessage: formData.bio.shortMessage || "",
            messageToStudent: formData.bio.messageToStudent || "",
            classroom: formData.bio.classroom || ""
        }
        try {
            const res: Response = await UpdateBio({ shortMessage: data.shortMessage, messageToStudent: data.messageToStudent, classroom: data.classroom });
            if (res.message && res.type) {
                toast[res.type](res.message, { position: 'bottom-right' });
                setIsEditingBio(!isEditingBio)
            }
        } catch (e) {
            toast.error(`ไม่สามารถแก้ไขข้อมูลได้ กรุณาลองอีกครั้ง`, { position: 'bottom-right' });
        }

    }

    const handleBioChange = (field: keyof Bio, value: string) => {

        setFormData(prev => ({
            ...prev,
            bio: { ...prev.bio, [field]: value }
        }));
    };

    const handleAddExperience = async () => {
        if (!newExperience.trim()) {
            return toast.error(`กรุณาป้อนผลงาน`, { position: `bottom-right` })
        };

        try {
            const res: Response = await AddExperience({ title: newExperience });
            if (res.message && res.type) {
                toast[res.type](res.message, { position: 'bottom-right' });
                const newExperienceData = res.data;

                setFormData((prev) => ({
                    ...prev,
                    bio: {
                        ...prev.bio,
                        experiences: [
                            ...prev.bio.experiences,
                            {
                                id: newExperienceData.id,
                                experience: { id: newExperienceData.experienceId, title: newExperience }
                            },
                        ],
                    },
                }));
                setNewExperience('');
            }
        } catch (e) {
            toast.error(`ไม่สามารถเพิ่มผลงานได้ กรุณาลองอีกครั้ง`, { position: 'bottom-right' });
        }
    };


    const handleDeleteExperience = async (id: number) => {
        if (!id) return;

        try {
            const res: Response = await RemoveExperience({ id });
            if (res.message && res.type) {
                toast[res.type](res.message, { position: 'bottom-right' });
                setFormData(prev => ({
                    ...prev,
                    bio: {
                        ...prev.bio,
                        experiences: prev.bio.experiences.filter(exp => exp.experience.id !== id)
                    }
                }));
            }
        } catch (e) {
            toast.error(`ไม่สามารถลบผลงานได้ กรุณาลองอีกครั้ง`, { position: 'bottom-right' });
        }

    };

    const handleUpdateExperience = async () => {
        if (!editingExperience || !editingExperience.title.trim()) {
            toast.error('กรุณากรอกข้อมูลให้ถูกต้อง', { position: 'bottom-right' });
            return;
        }

        try {
            const res: Response = await UpdateExperience({
                id: editingExperience.id,
                title: editingExperience.title.trim(),
            });

            if (res.message && res.type === 'success') {
                toast.success(res.message, { position: 'bottom-right' });

                setFormData((prev) => ({
                    ...prev,
                    bio: {
                        ...prev.bio,
                        experiences: prev.bio.experiences.map((exp) =>
                            exp.experience.id === editingExperience.id
                                ? { ...exp, experience: { ...exp.experience, title: editingExperience.title } }
                                : exp
                        ),
                    },
                }));

                setEditingExperience(null);
            } else {
                toast.error(res.message || 'การอัปเดตล้มเหลว', { position: 'bottom-right' });
            }
        } catch (e) {
            toast.error('ไม่สามารถแก้ไขผลงานได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
        }
    };

    const handleAddContact = async () => {
        if (!newContact.username || !newContact.link || !newContact.platformId) {
            toast.error('กรุณากรอกข้อมูลให้ครบถ้วน', { position: 'bottom-right' });
            return;
        }
        try {
            const res: Response = await AddContact({
                username: newContact.username.trim(),
                link: newContact.link.trim(),
                platformId: Number(newContact.platformId),
            });

            if (res.message && res.type === 'success' && res.data) {
                toast[res.type](res.message, { position: 'bottom-right' });
                setFormData((prev) => ({
                    ...prev,
                    contacts: [...prev.contacts, res.data],
                }));


                setNewContact({
                    username: '',
                    link: '',
                    platformId: ''
                });
            } else {
                toast[res.type](res.message, { position: 'bottom-right' });
            }
        } catch (e) {
            toast.error('ไม่สามารถเพิ่มช่องทางติดต่อได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
        }



    };

    const handleUpdateContact = async (id: number) => {
        if (!editingContact) return;
        try {
            const res: Response = await UpdateContact({
                id: id,
                username: editingContact.username.trim(),
                link: editingContact.link.trim(),
            });

            if (res.message && res.type && res.data) {
                toast.success(res.message, { position: 'bottom-right' });
                setFormData((prev) => ({
                    ...prev,
                    contacts: prev.contacts.map((contact) =>
                        contact.id === id
                            ? { ...contact, ...res.data }
                            : contact
                    ),
                }));

                setEditingContact(null);
            }
        } catch (e) {
            toast.error('ไม่สามารถแก้ไขช่องทางติดต่อได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
        }

    };

    const handleRemoveContact = async (id: number) => {
        if (!id) {
            return;
        }

        try {
            const res: Response = await RemoveContact({
                id,
            });

            if (res.message && res.type) {
                toast.success(res.message, { position: 'bottom-right' });

                setFormData((prev) => ({
                    ...prev,
                    contacts: prev.contacts.filter((contact) => contact.id !== id),
                }));
            } else {
                toast.error(res.message || 'ลบไม่สำเร็จ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
            }
        } catch (e) {
            toast.error('ลบไม่สำเร็จ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
        }

    }

    const handleRemoveSkill = async (id: number) => {
        if (!id) {
            return;
        }

        try {
            const res: Response = await RemoveSkill({
                skillId: Number(id),
            });

            if (res.message && res.type) {
                toast.success(res.message, { position: 'bottom-right' });

                setFormData((prev) => ({
                    ...prev,
                    skills: prev.skills.filter((skill) => skill.skill.id !== id),
                }));
            } else {
                toast.error(res.message || 'ลบไม่สำเร็จ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
            }
        } catch (e) {
            toast.error('ลบไม่สำเร็จ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
        }

    }

    const handleAddSkill = async () => {
        if (!newSkill.id) {
            toast.error('กรุณาเลือกความสามารถพิเศษ', { position: 'bottom-right' });
            return;
        }

        if (formData.skills.length >= 3) {
            return toast.error('สามารถเลือกความสามารถพิเศษได้แค่ 3 อย่าง', { position: `bottom-right` })
        }

        try {
            const res: Response = await AddSkillInPartyList({
                skillId: Number(newSkill.id),
            });

            if (res.message && res.type && res.data) {
                toast[res.type](res.message, { position: 'bottom-right' });
                const newSkillData = res.data
                setFormData((prev) => ({
                    ...prev,
                    bio: {
                        ...prev.bio,
                        skills: [
                            ...prev.bio.skills,
                            {
                                id: newSkillData.skill.id,
                                skill: {
                                    id: newSkillData.skill.id,
                                    name: newSkillData.skill.name,
                                    icon: {
                                        id: newSkillData.skill.icon.id,
                                        name: newSkillData.skill.icon.name,
                                    },
                                },
                            },
                        ],
                    },
                    skills: [
                        ...prev.skills,
                        {
                            id: newSkillData.skill.id,
                            skill: {
                                id: newSkillData.skill.id,
                                name: newSkillData.skill.name,
                                icon: {
                                    id: newSkillData.skill.icon.id,
                                    name: newSkillData.skill.icon.name,
                                },
                            },
                        },
                    ],
                }));


                setNewSkill({
                    id: "",
                    name: "",
                    icon: {
                        id: 0,
                        name: "",
                    }
                });
            } else {
                toast[res.type](res.message, { position: 'bottom-right' });
            }
        } catch (e) {
            toast.error('ไม่สามารถความสามารถพิเศษได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
        }

    }

    return (
        <div className="p-6 space-y-6">
            {/* Bio Section */}
            <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        ข้อมูลส่วนตัว
                        <Button
                            variant="ghost"
                            className="ml-2"
                            onClick={isEditingBio ? handleUpdateBio : () => setIsEditingBio(!isEditingBio)}
                        >
                            {isEditingBio ? <Save
                                className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isEditingBio ? (
                        <>
                            <Input
                                value={formData.bio.shortMessage}
                                onChange={(e) => handleBioChange('shortMessage', e.target.value)}
                                placeholder="ข้อความสั้นๆ"
                                className="mb-2"
                            />
                            <Input
                                value={formData.bio.classroom}
                                onChange={(e) => handleBioChange('classroom', e.target.value)}
                                placeholder="ห้องเรียน"
                                className="mb-2"
                            />
                            <Textarea
                                value={formData.bio.messageToStudent}
                                onChange={(e) => handleBioChange('messageToStudent', e.target.value)}
                                placeholder="ข้อความถึงนักเรียน"
                                className="mb-2"
                                rows={8}
                            />
                            <Button onClick={handleUpdateBio}>บันทึก</Button>
                        </>
                    ) : (
                        <div className="space-y-2">
                            <p><strong>ข้อความสั้น:</strong> {formData.bio.shortMessage}</p>
                            <p><strong>ห้องเรียน:</strong> {formData.bio.classroom}</p>
                            <p><strong>ข้อความถึงนักเรียน:</strong> {formData.bio.messageToStudent}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Experiences Section */}
            <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                    <CardTitle>ผลงานและประสบการณ์</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            value={newExperience}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewExperience(e.target.value)}
                            placeholder="เพิ่มผลงานใหม่"
                        />
                        <Button onClick={handleAddExperience}>
                            <PlusCircle className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {formData.bio.experiences.map((exp) => (
                            <div key={exp.id} className="flex items-center gap-2 p-2 rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-500 hover:bg-gray-100 dark:hover:bg-gray-750 transition-all">
                                {editingExperience && editingExperience.id === exp.experience.id ? (
                                    <>
                                        <Input
                                            value={editingExperience?.title || ''}
                                            onChange={(e) =>
                                                setEditingExperience({
                                                    id: exp.experience.id,
                                                    title: e.target.value,
                                                })
                                            }
                                            className="flex-1"
                                        />


                                        <Button
                                            variant="ghost"
                                            onClick={() => handleUpdateExperience()}>
                                            <Save className="h-4 w-4" />
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <span className="flex-1">{exp.experience.title}</span>
                                        <Button
                                            variant="ghost"
                                            onClick={() =>
                                                setEditingExperience({
                                                    id: exp.experience.id,
                                                    title: exp.experience.title,
                                                })
                                            }
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleDeleteExperience(exp.experience.id!)}                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Contacts Section */}
            <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                    <CardTitle>ข้อมูลการติดต่อ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                        <Input
                            placeholder="ชื่อผู้ใช้"
                            value={newContact.username}
                            onChange={(e) => setNewContact({ ...newContact, username: e.target.value })}
                        />
                        <Input
                            placeholder="ลิงก์"
                            value={newContact.link}
                            onChange={(e) => setNewContact({ ...newContact, link: e.target.value })}
                        />
                        <Select
                            value={newContact.platformId}
                            onValueChange={(value) => setNewContact({ ...newContact, platformId: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={`เลือกช่องทางติดต่อ`} />
                            </SelectTrigger>
                            <SelectContent>
                                {platforms.map((platform) => (
                                    <SelectItem key={platform.id} value={platform.id.toString()}>
                                        {platform.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>
                    <Button onClick={handleAddContact}>เพิ่มข้อมูลติดต่อ</Button>

                    <div className="space-y-2">
                        {formData.contacts.map((contact) => (
                            <div key={contact.id} className="flex items-center gap-2 border p-2 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-500 hover:bg-gray-100 dark:hover:bg-gray-750 transition-all">
                                {editingContact?.id === contact.id ? (
                                    <>
                                        <Input
                                            value={editingContact.username}
                                            onChange={(e) => setEditingContact({
                                                ...editingContact,
                                                username: e.target.value
                                            })}
                                            className="flex-1"
                                        />
                                        <Input
                                            value={editingContact.link}
                                            onChange={(e) => setEditingContact({
                                                ...editingContact,
                                                link: e.target.value
                                            })}
                                            className="flex-1"
                                        />
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleUpdateContact(contact.id)}
                                        >
                                            <Save className="h-4 w-4" />
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Image
                                            width={24}
                                            height={24}
                                            src={`${process.env.NEXT_PUBLIC_PLATFORM_ICON_PATH}${contact.platform.icon}`}
                                            alt={contact.platform.name}
                                            className="w-6 h-6"
                                        />
                                        <span className="flex-1">{contact.username}</span>
                                        <a href={contact.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                            {contact.link}
                                        </a>
                                        <Button
                                            variant="ghost"
                                            onClick={() => setEditingContact({
                                                id: contact.id,
                                                username: contact.username,
                                                link: contact.link,
                                                platform: contact.platform,
                                            })}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleRemoveContact(contact.id)}                                        >
                                            <X className="h-4 w-4" />
                                        </Button>

                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="bg-white dark:bg-gray-900">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        ความสามารถพิเศษ | งานอดิเรท
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            (สูงสุด 3 อย่าง)
                        </span>
                    </CardTitle>
                    {(formData.skills.length - 3) > 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            เหลือช่องว่างอีก ({formData.skills.length - 3}) ช่อง
                        </p>
                    )}
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Select
                                disabled={formData.skills.length >= 3}
                                value={newSkill.id}
                                onValueChange={(value) => setNewSkill({ ...newSkill, id: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        placeholder={formData.skills.length >= 3
                                            ? "ครบจำนวนแล้ว"
                                            : "เลือกความสามารถพิเศษ"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {skills.map((skill) => (
                                        <SelectItem disabled={formData.skills.some(s => s.skill.id === skill.id)}
                                            key={skill.id} value={skill.id.toString()}>
                                            {skill.name}
                                        </SelectItem>
                                    ))}
                                    
                                </SelectContent>
                            </Select>
                            <Button
                                onClick={handleAddSkill}
                                disabled={!newSkill.id || formData.skills.length >= 3}
                                className="flex items-center gap-2 transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                เพิ่ม
                            </Button>
                        </div>

                        {formData.skills.length === 0 && (
                            <div className="text-center py-6 text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg">
                                <AlertCircle className="w-6 h-6 mx-auto mb-2 opacity-50" />
                                <p>ยังไม่ได้เลือกความสามารถพิเศษ</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            {formData.skills.map((skill) => (
                                <div
                                    key={skill.skill.id}
                                    className="flex items-center gap-3 p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-500 hover:bg-gray-100 dark:hover:bg-gray-750 transition-all"
                                >
                                    <Image
                                        width={24}
                                        height={24}
                                        src={`${process.env.NEXT_PUBLIC_PARTYLIST_SKILLS_ICON_PATH}${skill.skill.icon.name}`}
                                        alt={skill.skill.name}
                                        className="w-6 h-6"
                                    />
                                    <span className="flex-1 font-medium dark:text-gray-200">
                                        {skill.skill.name}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemoveSkill(skill.skill.id)}
                                        className="hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SettingProfile;