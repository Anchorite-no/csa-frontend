<script setup>
import { useConfirm } from 'primevue/useconfirm'
import { userRole, adminRole } from '@/const'
import { useUserStore } from '@/stores/user'

const confirm = useConfirm()
const axios = inject('axios')
const userStore = useUserStore()

const data = ref([])

const show = ref(false)
const page = ref(1)
const total = ref(0)
const size = ref(10)
const s = ref('')

const operator = ref(null)

const selectedUserRole = ref(null)
const selectedAdminRole = ref(null)

const ConfirmDelete = (event, uid) => {
    confirm.require({
        target: event.currentTarget,
        group: 'delete',
        message: '确认删除该用户？',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: '取消',
            severity: 'secondary',
            outlined: true,
        },
        acceptProps: {
            label: '删除',
            severity: 'danger',
        },
        accept: () => {
            axios
                .post('/admin/delete_user', {
                    uid: uid,
                })
                .then(() => {
                    fetchContent()
                    window.notyf.success('删除成功')
                })
        },
    })
}

const ConfirmChange = (event, data) => {
    selectedUserRole.value = data.rid
    selectedAdminRole.value = data.is_admin ? data.admin_rid : 0
    console.log(data)
    confirm.require({
        target: event.currentTarget,
        group: 'role',
        modal: true,
        header: '更改用户角色',
        message: `您正在修改 ${data.uid} ${data.nick} 的角色`,
        rejectProps: {
            label: '取消',
            severity: 'secondary',
            outlined: true,
        },
        acceptProps: {
            label: '修改',
            severity: 'danger',
        },
        accept: () => {
            // step1 更改用户角色
            axios
                .post('/admin/update_user_role', {
                    uid: data.uid,
                    rid: selectedUserRole.value,
                })
                .then(res => {
                    window.notyf.success(res.data.msg)
                    if (data.uid === userStore.uid) return
                    if (data.is_admin && selectedAdminRole.value === 0) {
                        // 如果是管理员，且选择的管理员角色为0，则删除管理员角色
                        return axios.post('/admin/deauthor', {
                            uid_deauthored: data.uid,
                        })
                    } else if (
                        data.is_admin &&
                        selectedAdminRole.value !== data.admin_rid
                    ) {
                        // 如果是管理员，且选择的管理员角色更改过，则更改管理员角色
                        return axios.post('/admin/deauthor', {
                            uid_deauthored: data.uid,
                            rid_deauthored: selectedAdminRole.value,
                        })
                    } else if (
                        !data.is_admin &&
                        selectedAdminRole.value !== 0
                    ) {
                        // 如果不是管理员，且选择的管理员角色不为0，则添加管理员角色
                        return axios.post('/admin/author', {
                            uid_authored: data.uid,
                            rid_authored: selectedAdminRole.value,
                        })
                    }
                })
                .then(res => {
                    if (res) window.notyf.success(res.data.msg)
                    fetchContent()
                })
        },
    })
}

const fetchContent = () => {
    axios
        .get('/admin/user_list', {
            params: {
                page: page.value,
                size: size.value,
                s: s.value,
            },
        })
        .then(res => {
            data.value = res.data
        })
}

axios
    .get('/news/count')
    .then(res => {
        total.value = res.data.count
    })
    .then(() => {
        fetchContent()
    })

const getRoleUser = rid => {
    if (!rid) return '会员'
    return userRole.find(item => item.rid === rid)?.role_name
}

const getRoleAdmin = rid => {
    if (!rid) return '无'
    return adminRole.find(item => item.rid === rid)?.role_name
}

watch([page, size], () => {
    fetchContent()
})
</script>

<template>
    <csa-edit-news
        v-model:show="show"
        @finish="fetchContent"
        :nid="operator"
    ></csa-edit-news>
    <ConfirmPopup group="delete"></ConfirmPopup>
    <ConfirmDialog group="role">
        <template #message="slotProps">
            <div class="m-2 w-64">
                <div class="mb-4 font-bold">
                    {{ slotProps.message.message }}
                </div>
                <div class="mb-2">选择用户角色</div>
                <Select
                    v-model="selectedUserRole"
                    :options="userRole"
                    size="small"
                    optionLabel="role_name"
                    optionValue="rid"
                    placeholder="选择用户角色"
                    class="w-full"
                />
                <div class="mb-2 mt-3">选择管理员角色</div>
                <Select
                    v-model="selectedAdminRole"
                    :options="adminRole"
                    size="small"
                    optionLabel="role_name"
                    optionValue="rid"
                    placeholder="选择管理员角色"
                    class="w-full"
                />
            </div>
        </template>
    </ConfirmDialog>
    <div class="main-part-lg mx-auto">
        <div class="text-3xl font-bold mb-6">用户管理</div>
        <div class="mb-6 items-center">
            <InputText type="text" size="small" v-model="s" />
            <Button
                label="搜索"
                icon="pi pi-search"
                size="small"
                class="ml-2"
                @click="fetchContent"
            ></Button>
        </div>
        <DataTable :value="data" class="mb-4">
            <Column field="uid" header="编号"></Column>
            <Column field="nick" header="姓名">
                <template #body="{ data }">
                    <div class="min-w-32">{{ data.nick }}</div>
                </template>
            </Column>
            <Column field="category" header="类型">
                <template #body="{ data }">
                    <div>{{ getRoleUser(data.rid) }}</div>
                </template>
            </Column>
            <Column field="category" header="管理角色">
                <template #body="{ data }">
                    <div>{{ getRoleAdmin(data.admin_rid) }}</div>
                </template>
            </Column>
            <Column field="last_login" header="上次登录">
                <template #body="{ data }">
                    <div>
                        {{
                            data.last_login
                                ? new Date(
                                      data.last_login * 1000
                                  ).toLocaleString()
                                : '未登录'
                        }}
                    </div>
                </template>
            </Column>
            <Column field="edit" header="更改类型">
                <template #body="{ data }">
                    <div>
                        <Button
                            label="修改"
                            severity="info"
                            size="small"
                            class="whitespace-nowrap"
                            @click="$event => ConfirmChange($event, data)"
                        ></Button>
                    </div>
                </template>
            </Column>
            <Column field="delete" header="删除">
                <template #body="{ data }">
                    <div>
                        <Button
                            label="删除"
                            severity="danger"
                            size="small"
                            class="whitespace-nowrap"
                            @click="$event => ConfirmDelete($event, data.uid)"
                        ></Button>
                    </div>
                </template>
            </Column>
        </DataTable>
        <div class="flex justify-end">
            <Paginator
                v-model:page="page"
                v-model:rows="size"
                :totalRecords="total"
                :rowsPerPageOptions="[10, 20, 30]"
            ></Paginator>
        </div>
    </div>
</template>

<style>
.p-datatable-column-title {
    white-space: nowrap;
}
</style>
