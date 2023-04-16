(module
  (func $log (import "js" "log") (param i32))
  (func $alert (import "js" "alert") (param i32))
  (func $dom (import "js" "dom") (param i32))

  (func $add2 (export "add2nr") (param $s1 i32) (param $s2 i32) (result i32)
    local.get $s1
    local.get $s2
    i32.add
  )

  (func (export "add2nrLog") (param $s1 i32) (param $s2 i32)
    local.get $s1
    local.get $s2
    i32.add
    call $log
  )

  (func (export "add2nrAlert") (param $s1 i32) (param $s2 i32)
    local.get $s1
    local.get $s2
    i32.add
    call $alert
  )

   (func (export "add2nrOpt") (param $s1 i32) (param $s2 i32) (param $s3 i32) ;;  0 - log, 1 - alert, 2 - dom
    (if (i32.eq (local.get $s3) (i32.const 0))
      (then
        local.get $s1
        local.get $s2
        call $add2
        (call $log)
      )
      (else 
        (if (i32.eq (local.get $s3) (i32.const 1))
          (then
            local.get $s1
            local.get $s2
            call $add2
            (call $alert)
          ) (else
            local.get $s1
            local.get $s2
            call $add2
            (call $dom)
          )
        )
      )
    )
  )
)