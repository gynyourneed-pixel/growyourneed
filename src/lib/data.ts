
import { UserData, Report } from "../types";
import { DocumentChartBarIcon } from "../icons";

export const user: UserData = {
    name: "Admin User",
    role: "Principal",
    avatarUrl: {
        small: 'https://i.pravatar.cc/36',
        medium: 'https://i.pravatar.cc/40',
        large: 'https://i.pravatar.cc/48',
    }
}

export const REPORTS_DATA: Report[] = [
    {
        id: 'student_performance',
        title: 'Student Performance',
        description: 'Analyze student grades, attendance, and overall performance across different subjects and grades.',
        icon: DocumentChartBarIcon,
        kpis: [
            { label: 'Avg. Grade', value: '88%', change: '+2%', changeType: 'positive' },
            { label: 'Avg. Attendance', value: '95%', change: '-1%', changeType: 'negative' },
            { label: 'Exams Passed', value: '1,150', subValue: 'out of 1,200 students' }
        ],
        chartData: [
            { name: 'Math', grade: 85 },
            { name: 'Science', grade: 92 },
            { name: 'History', grade: 82 },
            { name: 'English', grade: 90 },
            { name: 'Art', grade: 95 },
        ],
        tableData: {
            headers: ['Student ID', 'Name', 'Grade', 'Attendance'],
            rows: [
                { student_id: 'S001', name: 'Alice', grade: 95, attendance: '98%' },
                { student_id: 'S002', name: 'Bob', grade: 82, attendance: '92%' },
                { student_id: 'S003', name: 'Charlie', grade: 91, attendance: '96%' },
                { student_id: 'S004', name: 'David', grade: 78, attendance: '88%' },
                { student_id: 'S005', name: 'Eve', grade: 99, attendance: '100%' },
            ]
        }
    },
    {
        id: 'financial_summary',
        title: 'Financial Summary',
        description: 'A complete overview of revenue from tuition, expenses, and payroll for the fiscal year.',
        icon: DocumentChartBarIcon,
        kpis: [
            { label: 'Total Revenue', value: '$2.5M', change: '+5%', changeType: 'positive' },
            { label: 'Total Expenses', value: '$1.8M', change: '+3%', changeType: 'negative' },
            { label: 'Net Income', value: '$700K', subValue: 'YTD' }
        ],
        chartData: [
            { name: 'Q1', revenue: 600, expenses: 450 },
            { name: 'Q2', revenue: 650, expenses: 480 },
            { name: 'Q3', revenue: 700, expenses: 500 },
            { name: 'Q4', revenue: 550, expenses: 370 },
        ],
        tableData: {
            headers: ['Category', 'Amount', 'Date', 'Status'],
            rows: [
                { category: 'Tuition Fees', amount: 150000, date: '2024-03-01', status: 'Received' },
                { category: 'Salaries', amount: -80000, date: '2024-05-05', status: 'Paid' },
                { category: 'Utilities', amount: -5000, date: '2024-08-10', status: 'Paid' },
                { category: 'Donations', amount: 25000, date: '2024-11-15', status: 'Received' },
                { category: 'Supplies', amount: -12000, date: '2024-02-20', status: 'Paid' },
            ]
        }
    },
    {
        id: 'enrollment_trends',
        title: 'Enrollment Trends',
        description: 'Track new admissions, re-enrollments, and withdrawals over time to understand enrollment patterns.',
        icon: DocumentChartBarIcon,
        kpis: [
            { label: 'New Admissions', value: '52', change: '+10', changeType: 'positive' },
            { label: 'Withdrawals', value: '8', change: '+3', changeType: 'negative' },
            { label: 'Inquiry Pool', value: '120', subValue: 'for next semester' }
        ],
        chartData: [
            { name: '2020', enrollment: 1100 },
            { name: '2021', enrollment: 1150 },
            { name: '2022', enrollment: 1120 },
            { name: '2023', enrollment: 1180 },
            { name: '2024', enrollment: 1200 },
        ],
        tableData: {
            headers: ['Applicant Name', 'Grade', 'Application Date', 'Status'],
            rows: [
                { applicant_name: 'Frank', grade: 9, application_date: '2024-05-20', status: 'Accepted' },
                { applicant_name: 'Grace', grade: 10, application_date: '2024-05-22', status: 'Waitlisted' },
                { applicant_name: 'Heidi', grade: 9, application_date: '2024-05-25', status: 'Accepted' },
                { applicant_name: 'Ivan', grade: 11, application_date: '2024-05-28', status: 'Pending' },
                { applicant_name: 'Judy', grade: 9, application_date: '2024-06-01', status: 'Accepted' },
            ]
        }
    },
    {
        id: 'staff_attendance',
        title: 'Staff Attendance',
        description: 'Monitor staff attendance records, track leave, and ensure operational consistency.',
        icon: DocumentChartBarIcon,
        kpis: [
            { label: 'On-time Rate', value: '98%', change: '+1%', changeType: 'positive' },
            { label: 'Total Absences', value: '12', subValue: 'this month', change: '-5', changeType: 'positive' },
            { label: 'Leave Requests', value: '5', subValue: 'pending approval' }
        ],
        chartData: [
            { name: 'Jan', attendance: 98 },
            { name: 'Feb', attendance: 97 },
            { name: 'Mar', attendance: 99 },
            { name: 'Apr', attendance: 96 },
            { name: 'May', attendance: 98 },
        ],
        tableData: {
            headers: ['Staff ID', 'Name', 'Department', 'Status', 'Date'],
            rows: [
                { staff_id: 'T01', name: 'John Doe', department: 'Math', status: 'Present', date: '2024-01-10' },
                { staff_id: 'T02', name: 'Jane Smith', department: 'Science', status: 'Present', date: '2024-02-12' },
                { staff_id: 'A01', name: 'Peter Jones', department: 'Admin', status: 'On Leave', date: '2024-03-05' },
                { staff_id: 'T03', name: 'Mary Johnson', department: 'English', status: 'Present', date: '2024-01-20' },
                { staff_id: 'S01', name: 'Bill Williams', department: 'Support', status: 'Absent', date: '2024-04-01' },
            ]
        }
    },
    {
        id: 'resource_utilization',
        title: 'Resource Utilization',
        description: 'Overview of how school resources like labs, libraries, and sports facilities are being used.',
        icon: DocumentChartBarIcon,
        kpis: [
            { label: 'Lab Usage', value: '85%', subValue: 'peak hours', change: '+5%', changeType: 'positive' },
            { label: 'Library Visits', value: '1,200', subValue: 'this week' },
            { label: 'Booking Rate', value: '92%', subValue: 'for sports facilities' }
        ],
        chartData: [
            { name: 'Comp Lab', usage: 90 },
            { name: 'Chem Lab', usage: 75 },
            { name: 'Physics Lab', usage: 80 },
            { name: 'Library', usage: 95 },
            { name: 'Gym', usage: 88 },
        ],
        tableData: {
            headers: ['Resource', 'Booked Slots', 'Available Slots', 'Capacity'],
            rows: [
                { resource: 'Computer Lab', booked_slots: 45, available_slots: 5, capacity: 50 },
                { resource: 'Chemistry Lab', booked_slots: 30, available_slots: 10, capacity: 40 },
                { resource: 'Library', booked_slots: 90, available_slots: 10, capacity: 100 },
                { resource: 'Gymnasium', booked_slots: 23, available_slots: 2, capacity: 25 },
                { resource: 'Auditorium', booked_slots: 1, available_slots: 1, capacity: 2 },
            ]
        }
    },
    {
        id: 'parent_feedback',
        title: 'Parent Feedback',
        description: 'Consolidated feedback from parents regarding curriculum, staff, and school facilities.',
        icon: DocumentChartBarIcon,
        kpis: [
            { label: 'Satisfaction', value: '9.2/10', change: '+0.3', changeType: 'positive' },
            { label: 'Responses', value: '350', subValue: 'this quarter' },
            { label: 'Issues Raised', value: '15', change: '-5', changeType: 'positive' }
        ],
        chartData: [
            { name: 'Curriculum', rating: 9.5 },
            { name: 'Teachers', rating: 9.3 },
            { name: 'Facilities', rating: 8.8 },
            { name: 'Communication', rating: 9.0 },
            { name: 'Safety', rating: 9.4 },
        ],
        tableData: {
            headers: ['Date', 'Feedback Area', 'Rating', 'Comment Snippet'],
            rows: [
                { date: '2024-06-01', feedback_area: 'Teachers', rating: 10, comment_snippet: 'Mrs. Smith is amazing...' },
                { date: '2024-06-02', feedback_area: 'Facilities', rating: 7, comment_snippet: 'The playground needs...' },
                { date: '2024-06-03', feedback_area: 'Curriculum', rating: 9, comment_snippet: 'Love the new science...' },
                { date: '2024-06-04', feedback_area: 'Communication', rating: 8, comment_snippet: 'Newsletter could be...' },
                { date: '2024-06-05', feedback_area: 'Teachers', rating: 10, comment_snippet: 'Mr. Doe is very engaging.' },
            ]
        }
    }
];
